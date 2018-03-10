// react
import React from "react"
import InfoBlock from "./InfoBlock"
// redux
import { connect } from "react-redux"
import { voteComment } from "../redux/actions"
// etc
import styled from "styled-components"
import PropTypes from "prop-types"

/**
 * STYLED COMPONENTS
 */

const Wrapper = styled.section`
  padding: 0 2rem;
`

const List = styled.ol`
  list-style-type: none;
  border: 0.1rem solid #222;
  border-top: none;
  border-radius: 0 0 0.2rem 0.2rem;
`

const ListItem = styled.li`
  padding: 2rem;
  & + & {
    border-top: 0.1rem solid #222;
  }
`

const Disclaimer = styled.p`
  padding: 2rem;
  font-size: 1.2rem;
  color: #999;
`

/**
 * MAIN COMPONENT
 */

const CommentsList = ({ comments, voteComment }) => (
  <Wrapper>
    <List>
      {comments && comments.length ? (
        comments.map(comment => (
          <ListItem key={comment.id}>
            <InfoBlock
              small
              {...comment}
              title={comment.body}
              onVote={option => voteComment(comment.id, option)}
              onEdit={() => {}}
              onRemove={() => {}}
            />
          </ListItem>
        ))
      ) : (
        <Disclaimer>No comments yet. Lacking flame are we?</Disclaimer>
      )}
    </List>
  </Wrapper>
)
CommentsList.propTypes = {
  postId: PropTypes.string.isRequired
}

export default connect(
  (state, props) => ({
    comments: state.comments[props.postId]
      ? state.comments[props.postId]
          .filter(o => o.parentId === props.postId)
          .sort((a, b) => b.timestamp - a.timestamp)
      : null
  }),
  {
    voteComment
  }
)(CommentsList)
