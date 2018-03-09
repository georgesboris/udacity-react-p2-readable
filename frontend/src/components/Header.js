// react
import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { connect } from "react-redux"

const HeaderWrapper = styled.header`
  display: flex;
  align-items: center;
  padding: 2rem;
  background: black;
  background: linear-gradient(45deg, #000 0%, #222 100%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 2rem rgba(0, 0, 0, 0.6);
`

const Main = styled.div`
  flex-grow: 1;
  &:hover {
    opacity: 0.9;
  }
  &:active {
    opacity: 0.4;
  }
`

const Title = styled.h1`
  font-weight: 300;
  font-size: 3rem;
`

const TagLine = styled.h2`
  font-weight: 300;
  color: #999;
`

const Nav = styled.nav``
const NavList = styled.ul`
  display: flex;
  align-items: center;
  list-style-type: none;
`
const NavListItem = styled.li`
  font-size: 1.2rem;
  text-transform: uppercase;
  letter-spacing: 0.3em;
  &:hover {
    opacity: 0.8;
  }
  &:active {
    opacity: 0.4;
  }
  & > a {
    display: inline-block;
    padding: 1rem;
  }
`

const Header = ({ categories }) => {
  return (
    <HeaderWrapper>
      <Main>
        <Link to="/">
          <Title>Readable</Title>
          <TagLine>Flamming comments on contemporary rappers</TagLine>
        </Link>
      </Main>
      <Nav>
        <NavList>
          {categories.map(category => (
            <NavListItem key={category.path}>
              <Link to={category.path}>{category.name}</Link>
            </NavListItem>
          ))}
        </NavList>
      </Nav>
    </HeaderWrapper>
  )
}

export default connect(state => ({ categories: state.categories }))(Header)
