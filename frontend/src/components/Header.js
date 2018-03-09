// react
import React from "react"
import { Link } from "react-router-dom"
// redux
import { connect } from "react-redux"
import { setOrderBy } from "../redux/actions"
// etc
import styled from "styled-components"
import PropTypes from "prop-types"

const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 30rem;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  background: black;
  background: linear-gradient(45deg, #000 0%, #222 100%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 2rem rgba(0, 0, 0, 0.6);
`

const Main = styled.div`
  margin-bottom: 8rem;
`

const MainLink = styled(Link)`
  display: block;
  padding: 2rem;
  margin: -2rem;
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
  color: yellow;
`

const TagLine = styled.h2`
  font-weight: 300;
  line-height: 1.4em;
  letter-spacing: 0.02em;
  color: #999;
`

const MenuSectionWrapper = styled.nav`
  & + & {
    margin-top: 4rem;
  }
`

const MenuSectionTitle = styled.p`
  margin-bottom: 1rem;
  text-transform: uppercase;
  color: #999;
`

const MenuSectionList = styled.ul`
  list-style-type: none;
`
const MenuSectionListItem = styled.li`
  &:hover {
    opacity: 0.8;
  }
  &:active {
    opacity: 0.4;
  }
  & > a,
  & > button {
    display: block;
    padding: 0.5rem 0;
    border: none;
    background: none;
    box-shadow: none;
    font-size: 1.2rem;
    text-transform: uppercase;
    letter-spacing: 0.3em;
    color: ${props => (props.active ? "yellow" : "inherit")};
    cursor: pointer;
    &:active,
    &:focus {
      outline: none;
    }
  }
`

const MenuSection = ({ title, items }) => (
  <MenuSectionWrapper>
    <MenuSectionTitle>{title}</MenuSectionTitle>
    <MenuSectionList>
      {items.map(item => (
        <MenuSectionListItem key={item.id} active={item.active}>
          {item.onClick ? (
            <button onClick={item.onClick}>{item.label}</button>
          ) : (
            <Link to={item.to}>{item.label}</Link>
          )}
        </MenuSectionListItem>
      ))}
    </MenuSectionList>
  </MenuSectionWrapper>
)

const Header = ({ activeCategory, categories, orderBy, setOrderBy }) => {
  return (
    <HeaderWrapper>
      <Main>
        <MainLink to="/">
          <Title>Readable</Title>
          <TagLine>
            Flamming comments on contemporary genre defining rappers
          </TagLine>
        </MainLink>
      </Main>
      <MenuSection
        title="filter by"
        items={[
          {
            id: "none",
            label: "none",
            to: "/",
            active: !activeCategory
          },
          ...categories.map(category => ({
            id: category.path,
            label: category.name,
            to: category.path,
            active: category.path === activeCategory
          }))
        ]}
      />
      <MenuSection
        title="order by"
        items={[
          {
            id: "votes",
            label: "number of votes",
            active: orderBy === "votes",
            onClick: () => setOrderBy("votes")
          },
          {
            id: "timestamp",
            label: "creation date",
            active: orderBy === "timestamp",
            onClick: () => setOrderBy("timestamp")
          }
        ]}
      />
    </HeaderWrapper>
  )
}
Header.propTypes = {
  activeCategory: PropTypes.string,
  setOrderBy: PropTypes.func.isRequired,
  orderBy: PropTypes.oneOf(["votes", "timestamp"]).isRequired,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })
  ).isRequired
}

export default connect(
  state => ({
    categories: state.categories,
    orderBy: state.orderBy
  }),
  {
    setOrderBy
  }
)(Header)
