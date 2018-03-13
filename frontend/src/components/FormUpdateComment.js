// react
import React from "react"
import Form from "./Form"
// redux
import { connect } from "react-redux"
import { updateComment } from "../redux/actions"
// etc
import { commentFields } from "../helpers/fields"
import PropTypes from "prop-types"

const FormupdateComment = ({
  categories,
  comment,
  updateComment,
  onSubmit
}) => {
  return (
    <Form
      title="updating comment"
      onSubmit={updatedComment => {
        updateComment({
          ...comment,
          ...updatedComment
        })

        onSubmit && onSubmit()
      }}
      fields={[
        { ...commentFields.author, value: comment.author },
        { ...commentFields.body, value: comment.body }
      ]}
    />
  )
}
FormupdateComment.propTypes = {
  onSubmit: PropTypes.func,
  comment: PropTypes.shape({
    id: PropTypes.string.isRequired,
    parentId: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    timestamp: PropTypes.number.isRequired
  }).isRequired
}

export default connect(
  state => ({
    categories: state.categories
  }),
  {
    updateComment
  }
)(FormupdateComment)
