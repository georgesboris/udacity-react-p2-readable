// react
import React from "react"
import Form from "./Form"
// redux
import { compose } from "redux"
import { connect } from "react-redux"
import { createPost } from "../redux/actions"
// etc
import { postFields } from "../helpers/fields"
import { withRouter } from "react-router"

const FormCreatePost = ({ categories, createPost, onSubmit, history }) => {
  return (
    <Form
      title="creating new post"
      onSubmit={post => {
        createPost(post)
        onSubmit && onSubmit()
        history.push(`/${post.category}/${post.id}`)
      }}
      fields={[
        postFields.author,
        {
          ...postFields.categories,
          options: categories.map(c => ({
            value: c.path,
            label: c.name
          }))
        },
        postFields.title,
        postFields.body
      ]}
    />
  )
}

export default compose(
  withRouter,
  connect(
    state => ({
      categories: state.categories
    }),
    {
      createPost
    }
  )
)(FormCreatePost)
