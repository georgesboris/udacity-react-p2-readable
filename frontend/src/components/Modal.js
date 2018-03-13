// react
import React from "react"
// styled
import styled from "styled-components"

const Wrapper = styled.div`
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
  padding: 4rem;
  background-color: rgba(0, 0, 0, 0.4);
  cursor: pointer;
`

const Content = styled.div`
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 0.2rem;
  background-color: #111;
  box-shadow: 0 0 2rem rgba(0, 0, 0, 0.8);
  cursor: default;
`

const Modal = ({ children, onDismiss }) => {
  return (
    <Wrapper onClick={onDismiss}>
      <Content onClick={e => e.stopPropagation()}>{children}</Content>
    </Wrapper>
  )
}

export default Modal
