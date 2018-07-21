// react
import React, { Component } from "react"
import Post from "./Post"
import { withRouter } from "react-router"
// redux
import { compose } from "redux"
import { connect } from "react-redux"
import {
  fetchPosts,
  fetchCategoryPosts,
  showCreatePostModal
} from "../redux/actions"
// etc
import styled from "styled-components"
import { createSelector } from "reselect"

/**
 * STYLED COMPONENTS
 */

const Header = styled.header`
  display: flex;
  align-items: center;
`

const Title = styled.h1`
  flex-grow: 1;
  font-weight: bold;
  font-size: 1.1rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: #444;
`

const ButtonCreate = styled.button`
  margin: -1rem -2rem;
  padding: 1rem 2rem;
  background: transparent;
  border: none;
  box-shadow: none;
  font-weight: bold;
  font-size: 1.1rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: #999;
  cursor: pointer;
  &:hover {
    color: #dadada;
  }
  &:active {
    color: #444;
  }
`

const List = styled.ol`
  list-style-type: none;
`

const ListItem = styled.li`
  margin-top: 2rem;
`

/**
 * SELECTORS
 */

const postsSelector = createSelector(
  state => state.posts,
  state => state.orderBy,
  (state, props) => props.activeCategory,
  (posts, orderBy, activeCategory) =>
    activeCategory
      ? Object.keys(posts)
          .filter(id => posts[id].category === activeCategory)
          .sort((a, b) => posts[b][orderBy] - posts[a][orderBy])
      : Object.keys(posts).sort((a, b) => posts[b][orderBy] - posts[a][orderBy])
)

/**
 * MAIN COMPONENT
 */

class PostsList extends Component {
  componentDidMount() {
    this.setup(this.props.category, true, this.props.allCategories)
  }
  componentWillReceiveProps(nextProps) {
    if (
      this.props.activeCategory !== nextProps.activeCategory ||
      this.props.allCategories !== nextProps.allCategories
    ) {
      this.setup(
        nextProps.category,
        this.props.activeCategory !== nextProps.activeCategory,
        nextProps.allCategories
      )
    }
  }

  setup = (category, shouldFetch, allCategories) => {
    if (!!allCategories.length && !category) {
      this.props.history.replace("/")
    }

    if (!shouldFetch) {
      return
    }

    if (category) {
      this.props.fetchCategoryPosts(category.path)
    } else {
      this.props.fetchPosts()
    }
  }

  render() {
    const { category, posts, showCreatePostModal } = this.props
    return (
      <section>
        <Header>
          <Title>
            in regards to {category ? category.name : "all rappers"}
          </Title>
          <ButtonCreate onClick={showCreatePostModal}>new post</ButtonCreate>
        </Header>
        <List>
          {posts.map(postId => (
            <ListItem key={postId}>
              <Post isLink postId={postId} />
            </ListItem>
          ))}
        </List>
      </section>
    )
  }
}

export default compose(
  withRouter,
  connect(
    (state, props) => ({
      posts: postsSelector(state, props),
      allCategories: state.categories,
      category: props.activeCategory
        ? state.categories.find(o => o.path === props.activeCategory)
        : props.category
    }),
    {
      fetchPosts,
      fetchCategoryPosts,
      showCreatePostModal
    }
  )
)(PostsList)
