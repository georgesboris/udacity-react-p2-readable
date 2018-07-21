// react
import React from "react"
import Form from "./Form"
// redux
import { connect } from "react-redux"
import { createComment } from "../redux/actions"
// etc
import { commentFields } from "../helpers/fields"
import PropTypes from "prop-types"

const FormCreateComment = ({
  categories,
  parentId,
  createComment,
  onSubmit
}) => {
  return (
    <Form
      title="create comment"
      onSubmit={comment => {
        createComment({
          ...comment,
          parentId
        })

        onSubmit && onSubmit()
      }}
      fields={[commentFields.author, commentFields.body]}
    />
  )
}
FormCreateComment.propTypes = {
  parentId: PropTypes.string.isRequired,
  onSubmit: PropTypes.func
}

export default connect(
  state => ({
    categories: state.categories
  }),
  {
    createComment
  }
)(FormCreateComment)
