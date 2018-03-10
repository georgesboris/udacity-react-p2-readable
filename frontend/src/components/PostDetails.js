// react
import React, { Component } from "react"
import Post from "./Post"
import CommentsList from "./CommentsList"
import { Link } from "react-router-dom"
import { withRouter } from "react-router"
// redux
import { compose } from "redux"
import { connect } from "react-redux"
import { fetchPost } from "../redux/actions"
// etc
import styled from "styled-components"
import PropTypes from "prop-types"

const TitleLink = styled(Link)`
  display: block;
  margin: -2rem;
  padding: 2rem 2rem 4rem;
  font-weight: bold;
  font-size: 1.1rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: #444;
  cursor: pointer;
  &:hover {
    color: white;
  }
  &:active {
    color: #999;
  }
`

const PostWrapper = styled.div`
  position: relative;
  z-index: 1;
`

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
      .catch(e => {
        history.replace("/")
      })
  }

  render() {
    const { postId } = this.props
    const { isLoading } = this.state
    return isLoading ? (
      <div />
    ) : (
      <article>
        <TitleLink to="/">back to list</TitleLink>
        <PostWrapper>
          <Post showBody postId={postId} />
        </PostWrapper>
        <CommentsList postId={postId} />
      </article>
    )
  }
}
PostDetails.propTypes = {
  postId: PropTypes.string.isRequired
}

export default compose(
  withRouter,
  connect(null, {
    fetchPost
  })
)(PostDetails)
