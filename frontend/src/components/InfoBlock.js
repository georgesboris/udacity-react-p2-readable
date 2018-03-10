// react
import React from "react"
import VotingMechanism from "./VotingMechanism"
import FaComments from "react-icons/lib/fa/comments"
import FaPencil from "react-icons/lib/fa/pencil"
import FaTrash from "react-icons/lib/fa/trash"
// etc
import styled from "styled-components"
import PropTypes from "prop-types"

/**
 * STYLED COMPONENTS
 */

const Wrapper = styled.article`
  display: flex;
  align-items: center;
`

const Main = styled.div`
  flex-grow: 1;
`

const Author = styled.span`
  color: #999;
`

const Title = styled.h1`
  padding: 0.4rem 0;
  font-size: ${props => (props.small ? 1.2 : 1.6)}rem;
  font-weight: ${props => (props.small ? "normal" : "bold")};
`

const Time = styled.time`
  color: #555;
  font-size: 0.9rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
`

const Body = styled.p`
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #2a2a2a;
  font-size: 1.2rem;
  line-height: 1.4em;
`

const Actions = styled.div`
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
 * MAIN COMPONENT
 */

const InfoBlock = ({
  small,
  author,
  title,
  timestamp,
  voteScore,
  commentCount,
  onEdit,
  onRemove,
  onVote
}) => {
  return (
    <Wrapper>
      <VotingMechanism value={voteScore} onVote={onVote} />
      <Main>
        <Author>{author}</Author>
        <Title small={small}>{title}</Title>
        <Time>
          at {new Date(timestamp).toLocaleTimeString()}{" "}
          {new Date(timestamp).toLocaleDateString()}
        </Time>
      </Main>
      <Actions>
        {commentCount !== undefined && (
          <ActionButton>
            <ActionButtonLabel>{commentCount}</ActionButtonLabel>
            <FaComments size={18} />
          </ActionButton>
        )}
        <ActionButton onClick={onEdit}>
          <FaPencil size={18} />
        </ActionButton>
        <ActionButton onClick={onRemove}>
          <FaTrash size={18} />
        </ActionButton>
      </Actions>
    </Wrapper>
  )
}
InfoBlock.propTypes = {
  small: PropTypes.bool,
  header: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  timestamp: PropTypes.number.isRequired,
  voteScore: PropTypes.number.isRequired,
  commentCount: PropTypes.number,
  onEdit: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onVote: PropTypes.func.isRequired
}

export default InfoBlock
