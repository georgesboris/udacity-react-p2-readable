// react
import React from "react"
import FaAngleUp from "react-icons/lib/fa/angle-up"
import FaAngleDown from "react-icons/lib/fa/angle-down"
// etc
import styled from "styled-components"
import PropTypes from "prop-types"

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

const VotingMechanism = ({ value, onVote }) => (
  <VotingWrapper>
    <VotingButton
      onClick={e => {
        e.stopPropagation()
        e.preventDefault()
        onVote("upVote")
      }}
    >
      <FaAngleUp color="white" size={22} />
    </VotingButton>
    <VotingValue>{value}</VotingValue>
    <VotingButton
      onClick={e => {
        e.stopPropagation()
        e.preventDefault()
        onVote("downVote")
      }}
    >
      <FaAngleDown color="white" size={22} />
    </VotingButton>
  </VotingWrapper>
)
VotingMechanism.propTypes = {
  value: PropTypes.number.isRequired,
  onVote: PropTypes.func.isRequired
}

export default VotingMechanism
