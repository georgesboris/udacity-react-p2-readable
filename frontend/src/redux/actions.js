import * as api from "../helpers/api"
import * as actions from "./reducer"

/**
 * ASYNC ACTIONS
 */

export const fetchCategories = () => dispatch => {
  api.fetchCategories().then(({ categories }) => {
    dispatch({ type: actions.SET_CATEGORIES, payload: categories })
  })
}

function _addPost(post) {
  return { type: actions.ADD_POST, payload: post }
}

export const fetchPosts = () => dispatch => {
  api.fetchPosts().then(posts => {
    posts.forEach(post => dispatch(_addPost(post)))
  })
}

export const fetchCategoryPosts = category => dispatch => {
  api.fetchCategoryPosts(category).then(posts => {
    posts.forEach(post => dispatch(_addPost(post)))
  })
}

export const votePost = (postId, voteType) => dispatch => {
  api.votePost(postId, voteType).then(post => {
    dispatch(_addPost(post))
  })
}

/**
 * ACTIONS
 */

export const setOrderBy = orderBy => ({
  type: actions.SET_ORDER_BY,
  payload: orderBy
})
