// react
import React from "react"
// redux
import { connect } from "react-redux"
// etc
import styled from "styled-components"
import PropTypes from "prop-types"

const Wrapper = styled.article`
  padding: 2rem;
  border-radius: 0.2rem;
  background: #222;
  background: linear-gradient(45deg, #1a1a1a 0%, #1d1d1d 100%);
  box-shadow: 0 0 2rem rgba(0, 0, 0, 0.6);
`

const Author = styled.p`
  color: #999;
  margin-bottom: 0.4rem;
`

const Title = styled.h1`
  font-size: 1.6rem;
`

const Post = ({ post }) =>
  !post ? (
    <Wrapper />
  ) : (
    <Wrapper>
      <Author>{post.author}</Author>
      <Title>{post.title}</Title>
      <p>votes: {post.voteScore}</p>
      <p>number of comments: {post.commentCount}</p>
    </Wrapper>
  )

Post.propTypes = {
  postId: PropTypes.string.isRequired,
  post: PropTypes.shape({
    author: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    voteScore: PropTypes.number.isRequired,
    commentCount: PropTypes.number.isRequired
  })
}

export default connect((state, props) => ({
  post: state.posts[props.postId]
}))(Post)
