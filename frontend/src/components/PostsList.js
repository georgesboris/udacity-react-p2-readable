// react
import React, { Component } from "react"
import Post from "./Post"
import { withRouter } from "react-router"
// redux
import { compose } from "redux"
import { connect } from "react-redux"
import { fetchPosts, fetchCategoryPosts } from "../redux/actions"
// etc
import styled from "styled-components"
import { createSelector } from "reselect"

/**
 * STYLED COMPONENTS
 */

const Title = styled.h1`
  font-weight: bold;
  font-size: 1.1rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: #444;
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
          .sort((a, b) => posts[a][orderBy] - posts[b][orderBy])
      : Object.keys(posts).sort((a, b) => posts[a][orderBy] - posts[b][orderBy])
)

/**
 * MAIN COMPONENT
 */

class PostsList extends Component {
  componentDidMount() {
    this.fetchPosts(this.props.category, this.props.allCategories)
  }
  componentWillReceiveProps(nextProps) {
    if (
      this.props.category !== nextProps.category ||
      this.props.allCategories !== nextProps.allCategories
    ) {
      this.fetchPosts(nextProps.category, this.props.allCategories)
    }
  }

  fetchPosts = (category, allCategories) => {
    if (allCategories && !category) {
      this.props.history.replace("/")
    }

    if (category) {
      this.props.fetchCategoryPosts(category.path)
    } else {
      this.props.fetchPosts()
    }
  }

  render() {
    const { category, posts } = this.props
    return (
      <section>
        <Title>in regards to {category ? category.name : "all rappers"}</Title>
        <List>
          {posts.map(postId => (
            <ListItem key={postId}>
              <Post postId={postId} showBody isLink />
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
        ? state.categories.find(o => o.path === props.category)
        : props.category
    }),
    {
      fetchPosts,
      fetchCategoryPosts
    }
  )
)(PostsList)
