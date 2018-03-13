// react
import React from "react"
import InfoBlock from "./InfoBlock"
import { Link } from "react-router-dom"
// redux
import { connect } from "react-redux"
import { votePost, showUpdatePostModal, removePost } from "../redux/actions"
// etc
import styled from "styled-components"
import PropTypes from "prop-types"

/**
 * STYLED COMPONENTS
 */

const Wrapper = styled.article`
  padding: 1.6rem 2rem;
  border: 1px solid rgba(255, 255, 255, 0.025);
  border-radius: 0.2rem;
  background: #222;
  background: linear-gradient(45deg, #1a1a1a 0%, #1d1d1d 100%);
  box-shadow: 0 0 2rem rgba(0, 0, 0, 0.6);
`

const WrapperLink = styled(Link)`
  display: block;
  margin: -1px;
  border: 1px solid transparent;
  border-radius: 0.3rem;
  &:hover {
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 0 2rem rgba(0, 0, 0, 1);
  }
`

const Body = styled.p`
  margin-top: 1.6rem;
  padding: 2.4rem 4.3rem 0.8rem;
  border-top: 1px solid #2a2a2a;
  font-size: 1.2rem;
  line-height: 1.4em;
`

/**
 * MAIN COMPONENT
 */

const Post = ({
  postId,
  post,
  comments,
  showBody,
  isLink,
  votePost,
  showUpdatePostModal,
  removePost
}) => {
  const component = !post ? (
    <Wrapper />
  ) : (
    <Wrapper>
      <InfoBlock
        {...post}
        commentCount={comments ? comments.length : post.commentCount}
        onVote={option => votePost(postId, option)}
        onEdit={() => showUpdatePostModal(postId)}
        onRemove={() => removePost(postId)}
      />
      {showBody && <Body>{post.body}</Body>}
    </Wrapper>
  )

  return isLink && post ? (
    <WrapperLink to={`/${post.category}/${postId}`}>{component}</WrapperLink>
  ) : (
    component
  )
}

Post.propTypes = {
  postId: PropTypes.string.isRequired,
  showBody: PropTypes.bool,
  isLink: PropTypes.bool,
  post: PropTypes.shape({
    author: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    timestamp: PropTypes.number.isRequired,
    voteScore: PropTypes.number.isRequired,
    commentCount: PropTypes.number.isRequired
  })
}

export default connect(
  (state, props) => ({
    post: state.posts[props.postId],
    comments: state.comments[props.postId]
  }),
  {
    votePost,
    showUpdatePostModal,
    removePost
  }
)(Post)
