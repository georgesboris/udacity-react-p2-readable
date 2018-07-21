// react
import React from "react"
import Form from "./Form"
// redux
import { connect } from "react-redux"
import { updatePost } from "../redux/actions"
// etc
import { postFields } from "../helpers/fields"
import PropTypes from "prop-types"

const FormUpdatePost = ({ post, categories, updatePost, onSubmit }) => {
  return (
    <Form
      title="updating post"
      onSubmit={updatedPost => {
        updatePost({
          ...post,
          ...updatedPost
        })

        onSubmit && onSubmit()
      }}
      fields={[
        { ...postFields.author, value: post.author },
        {
          ...postFields.categories,
          value: post.category,
          options: categories.map(c => ({
            value: c.path,
            label: c.name
          }))
        },
        { ...postFields.title, value: post.title },
        { ...postFields.body, value: post.body }
      ]}
    />
  )
}
FormUpdatePost.propTypes = {
  postId: PropTypes.string.isRequired,
  onSubmit: PropTypes.func
}

export default connect(
  (state, props) => ({
    post: state.posts[props.postId],
    categories: state.categories
  }),
  {
    updatePost
  }
)(FormUpdatePost)
