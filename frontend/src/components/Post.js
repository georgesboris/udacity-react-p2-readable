// react
import React from "react"
import FaAngleUp from "react-icons/lib/fa/angle-up"
import FaAngleDown from "react-icons/lib/fa/angle-down"
import FaComments from "react-icons/lib/fa/comments"
import FaPencil from "react-icons/lib/fa/pencil"
import FaTrash from "react-icons/lib/fa/trash"
import { Link } from "react-router-dom"
// redux
import { connect } from "react-redux"
import { votePost } from "../redux/actions"
// etc
import styled from "styled-components"
import PropTypes from "prop-types"

/**
 * STYLED COMPONENTS
 */

const Wrapper = styled.article`
  display: flex;
  align-items: center;
  padding: 2rem;
  border-radius: 0.2rem;
  background: #222;
  background: linear-gradient(45deg, #1a1a1a 0%, #1d1d1d 100%);
  box-shadow: 0 0 2rem rgba(0, 0, 0, 0.6);
`

const Main = styled.div`
  flex-grow: 1;
`

const Author = styled.p`
  color: #999;
  margin-bottom: 0.4rem;
`

const Title = styled.h1`
  font-size: 1.6rem;
`

const Body = styled.p`
  margin-top: 2rem;
  font-size: 1.2rem;
  line-height: 1.4em;
`

const Actions = styled.div`
  align-self: flex-start;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  padding: 0.4rem;
  background: transparent;
  border: none;
  box-shadow: none;
  color: white;
  cursor: pointer;
  opacity: 0.1;
  &:hover {
    opacity: 1;
  }
  &:active {
    opacity: 0.4;
  }
`

const ActionButtonLabel = styled.span`
  display: inline-block;
  margin-right: 0.4rem;
  border-radius: 50%;
  font-weight: 300;
  text-align: right;
`

/**
 * HELPER COMPONENTS
 */

const VotingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 2rem;
`

const VotingButton = styled.button`
  background: transparent;
  border: none;
  box-shadow: none;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
  &:active {
    opacity: 0.4;
  }
`

const VotingValue = styled.p`
  font-size: 1.4rem;
  font-weight: bold;
`

const VotingMechanism = ({ value, onUpVote, onDownVote }) => (
  <VotingWrapper>
    <VotingButton onClick={onUpVote}>
      <FaAngleUp color="white" size={22} />
    </VotingButton>
    <VotingValue>{value}</VotingValue>
    <VotingButton onClick={onDownVote}>
      <FaAngleDown color="white" size={22} />
    </VotingButton>
  </VotingWrapper>
)
VotingMechanism.propTypes = {
  value: PropTypes.number.isRequired,
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired
}

/**
 * MAIN COMPONENT
 */

const Post = ({ postId, post, showBody, isLink, votePost }) => {
  const component = !post ? (
    <Wrapper />
  ) : (
    <Wrapper>
      <VotingMechanism
        value={post.voteScore}
        onUpVote={() => votePost(postId, "upVote")}
        onDownVote={() => votePost(postId, "downVote")}
      />
      <Main>
        <Author>{post.author}</Author>
        <Title>{post.title}</Title>
        {showBody && <Body>{post.body}</Body>}
      </Main>
      <Actions>
        <ActionButton>
          <ActionButtonLabel>{post.commentCount}</ActionButtonLabel>
          <FaComments size={18} />
        </ActionButton>
        <ActionButton>
          <FaPencil size={18} />
        </ActionButton>
        <ActionButton>
          <FaTrash size={18} />
        </ActionButton>
      </Actions>
    </Wrapper>
  )

  return isLink && post ? (
    <Link to={`/${post.category}/${postId}`}>{component}</Link>
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
    voteScore: PropTypes.number.isRequired,
    commentCount: PropTypes.number.isRequired
  })
}

export default connect(
  (state, props) => ({
    post: state.posts[props.postId]
  }),
  {
    votePost
  }
)(Post)
