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

export const fetchPost = postId => (dispatch, getState) => {
  return Promise.all([
    api.fetchPost(postId),
    api.fetchPostComments(postId)
  ]).then(([post, comments]) => {
    if (!post || post.error || post.deleted) {
      return Promise.reject()
    }

    dispatch(_addPost(post))
    dispatch({
      type: actions.SET_COMMENTS,
      payload: { postId, comments }
    })

    return post
  })
}

export const votePost = (postId, option) => dispatch => {
  api.votePost(postId, option).then(post => {
    dispatch(_addPost(post))
  })
}

export const voteComment = (commentId, option) => dispatch => {
  api.voteComment(commentId, option).then(comment => {
    dispatch({ type: actions.UPDATE_COMMENT, payload: comment })
  })
}

/**
 * ACTIONS
 */

export const setOrderBy = orderBy => ({
  type: actions.SET_ORDER_BY,
  payload: orderBy
})
