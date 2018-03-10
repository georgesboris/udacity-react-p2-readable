// react
import React, { Component } from "react"
import Post from "./Post"
import { withRouter } from "react-router"
// redux
import { compose } from "redux"
import { connect } from "react-redux"
import { fetchPost } from "../redux/actions"
// etc
import styled from "styled-components"
import PropTypes from "prop-types"

class PostDetails extends Component {
  state = {
    isLoading: true
  }

  componentDidMount() {
    this.setup(this.props.postId)
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.postId !== nextProps.postId) {
      this.setup(nextProps.postId)
    }
  }

  setup(postId) {
    const { fetchPost, history } = this.props
    this.setState({ isLoading: true })

    fetchPost(postId)
      .then(post => {
        this.setState({ isLoading: false })
      })
      .catch(() => {
        history.replace("/")
      })
  }

  render() {
    const { postId } = this.props
    return (
      <article>
        <Post showBody postId={postId} />
      </article>
    )
  }
}
PostDetails.propTypes = {
  postId: PropTypes.string.isRequired
}

export default compose(
  withRouter,
  connect(
    (state, props) => ({
      comments: Object.keys(state.comments)
        .map(id => state.comments[id])
        .filter(o => o.parentId === props.postId)
        .sort((a, b) => a.voteScore - b.voteScore)
    }),
    {
      fetchPost
    }
  )
)(PostDetails)
