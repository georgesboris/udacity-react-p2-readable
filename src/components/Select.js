// react
import React, { Component } from "react"
// etc
import styled from "styled-components"

const Wrapper = styled.label`
  position: relative;
  display: block;
`

const ButtonValue = styled.button`
  position: relative;
  width: 100%;
  padding: 1rem 0;
  border: none;
  background: none;
  box-shadow: none;
  text-align: left;
  cursor: pointer;
  color: white;
  &:hover {
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
  }
  &:focus {
    outline: none;
  }
  &[disabled] {
    color: inherit;
    cursor: default;
  }
  &[disabled]:hover {
    box-shadow: none;
  }
`

const Arrow = styled.span`
  position: absolute;
  top: 1.6rem;
  right: 0;
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid #444;
`

const Placeholder = styled.span`
  color: #757575;
`

const Options = styled.ol`
  position: absolute;
  z-index: 9999;
  top: 0;
  width: 100%;
  background-color: #111;
  border: 1px solid #222;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  list-style-type: none;
`

const OptionsItem = styled.li`
  padding: 1.2rem 1rem;
  font-size: 1.2rem;
  color: #dadada;
  cursor: pointer;
  background-color: ${props => (props.active ? "#222" : "#111")};
  &:hover {
    background-color: #1a1a1a;
  }
`

const HiddenInput = styled.select`
  position: fixed;
  left: -1000px;
`

class Select extends Component {
  state = {
    isOpen: false
  }

  toggleOpen = () => {
    this.setState(state => ({ isOpen: !state.isOpen }))
  }

  onSelect = (e, value) => {
    e.stopPropagation()
    e.preventDefault()

    this.setState({ isOpen: false })
    this.props.onChange && this.props.onChange(value)
  }

  render() {
    const { value, placeholder, options } = this.props
    const { isOpen } = this.state

    const activeOption =
      value !== undefined && options && options.find(o => o.value === value)

    const inputValue = value !== null && value !== undefined ? value : ""

    const disabled = !options || options.length < 2

    return (
      <Wrapper>
        <ButtonValue
          type="button"
          onClick={this.toggleOpen}
          disabled={disabled}
        >
          {activeOption ? (
            activeOption.label
          ) : (
            <Placeholder>{placeholder || "-"}</Placeholder>
          )}
          {!disabled && <Arrow />}
        </ButtonValue>

        {isOpen && (
          <Options>
            {options &&
              options.map(option => (
                <OptionsItem
                  key={option.value}
                  onClick={e => this.onSelect(e, option.value)}
                >
                  {option.label}
                </OptionsItem>
              ))}
          </Options>
        )}

        <HiddenInput value={inputValue} readOnly>
          {options &&
            options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
        </HiddenInput>
      </Wrapper>
    )
  }
}

export default Select
