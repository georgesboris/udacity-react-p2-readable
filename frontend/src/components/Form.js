// react
import React, { Component } from "react"
import Select from "./Select"
// etc
import PropTypes from "prop-types"
import styled from "styled-components"

const Wrapper = styled.form`
  width: 40rem;
  max-width: 100%;
`

const Title = styled.h1`
  padding: 0 2rem 2rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid #222;
  font-size: 1.6em;
  font-weight: 300;
  text-transform: uppercase;
  text-align: center;
  letter-spacing: 0.1em;
  color: yellow;
`

const Field = styled.div`
  margin-bottom: 1rem;
`

const Label = styled.label`
  display: block;
  color: #dadada;
`

const TextInput = styled.input`
  display: block;
  width: 100%;
  padding: 1rem 0;
  border: none;
  background: none;
  box-shadow: none;
  color: white;
  &:focus {
    box-shadow: none;
    outline: none;
  }
`

const TextareaInput = TextInput.withComponent("textarea").extend`
  height: 8em;
  resize: none;
`

const SubmitButtonWrapper = styled.div`
  border-top: 1px solid #222;
`

const SubmitButton = styled.button.attrs({
  type: "submit"
})`
  width: 100%;
  margin-bottom: -2rem;
  padding: 2rem;
  border: none;
  background: none;
  box-shadow: none;
  font-size: 1.2rem;
  text-transform: uppercase;
  letter-spacing: 0.3em;
  color: yellow;
  cursor: pointer;
  &:hover {
    opacity: 0.6;
  }
  &:active {
    opacity: 0.4;
  }
  &:focus {
    outline: none;
  }
`

class Form extends Component {
  state = { fields: {} }

  componentWillMount() {
    this.setup(this.props)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.fields !== nextProps.fields) {
      this.setup(nextProps)
    }
  }

  setup = props => {
    this.setState({
      fields: props.fields.reduce(
        (acc, field) => ({
          ...acc,
          [field.name]: field.value || ""
        }),
        {}
      )
    })
  }

  onSubmit = () => {
    this.props.onSubmit(this.state.fields)
  }

  render() {
    const { title, fields, onSubmit } = this.props
    return (
      <Wrapper onSubmit={this.onSubmit}>
        <Title>{title}</Title>
        {fields.map(field => {
          let inputProps = {
            id: field.name,
            value: this.state.fields[field.name],
            placeholder: field.placeholder,
            required: field.required,
            onChange: evtOrValue => {
              this.setState({
                fields: {
                  ...this.state.fields,
                  [field.name]:
                    evtOrValue && evtOrValue.target
                      ? evtOrValue.target.value
                      : evtOrValue
                }
              })
            }
          }

          return (
            <Field key={field.name}>
              <Label for={field.name}>{field.label}</Label>
              {field.type === "text" ? (
                <TextInput {...inputProps} type="text" />
              ) : field.type === "textarea" ? (
                <TextareaInput {...inputProps} />
              ) : field.type === "select" ? (
                <Select {...inputProps} options={field.options} />
              ) : null}
            </Field>
          )
        })}
        <SubmitButtonWrapper>
          <SubmitButton>Confirm</SubmitButton>
        </SubmitButtonWrapper>
      </Wrapper>
    )
  }
}
Form.propTypes = {
  title: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      required: PropTypes.bool,
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      type: PropTypes.oneOf(["text", "textarea", "select"]),
      value: PropTypes.string,
      options: PropTypes.arrayOf(
        PropTypes.shape({
          value: PropTypes.string.isRequired,
          label: PropTypes.string.isRequired
        })
      )
    })
  ).isRequired
}

export default Form
