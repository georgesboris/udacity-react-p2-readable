import * as api from "../helpers/api"
import * as actions from "./reducer"
import uuid from "uuid"

/**
 * ACTIONS
 */

function _addPost(post) {
  return { type: actions.ADD_POST, payload: post }
}

function _addComment(comment) {
  return { type: actions.ADD_COMMENT, payload: comment }
}

export function hideModal() {
  return { type: actions.MODAL_HIDE }
}

export function showCreatePostModal() {
  return { type: actions.MODAL_CREATE_POST }
}

export function showUpdatePostModal(postId) {
  return { type: actions.MODAL_UPDATE_POST, payload: { id: postId } }
}

export function showCreateCommentModal(parentId) {
  return { type: actions.MODAL_CREATE_COMMENT, payload: { parentId } }
}

export function showUpdateCommentModal(comment) {
  return { type: actions.MODAL_UPDATE_COMMENT, payload: comment }
}

/**
 * ASYNC ACTIONS
 */

export const fetchCategories = () => dispatch => {
  api.fetchCategories().then(({ categories }) => {
    dispatch({ type: actions.SET_CATEGORIES, payload: categories })
  })
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
    if (!post || !post.id || post.error || post.deleted) {
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

export const createPost = post => dispatch => {
  return api
    .createPost({
      ...post,
      id: uuid.v4(),
      timestamp: Date.now()
    })
    .then(post => dispatch(_addPost(post)))
}

export const updatePost = post => dispatch => {
  return api.updatePost(post).then(dispatch(_addPost(post)))
}

export const removePost = postId => dispatch => {
  return api
    .removePost(postId)
    .then(dispatch({ type: actions.REMOVE_POST, payload: { id: postId } }))
}

export const votePost = (postId, option) => dispatch => {
  api.votePost(postId, option).then(post => {
    dispatch(_addPost(post))
  })
}

export const createComment = comment => dispatch => {
  return api
    .createComment({
      ...comment,
      id: uuid.v4(),
      timestamp: Date.now()
    })
    .then(comment => dispatch(_addComment(comment)))
}

export const updateComment = comment => dispatch => {
  return api
    .updateComment(comment)
    .then(() => dispatch({ type: actions.UPDATE_COMMENT, payload: comment }))
}

export const removeComment = comment => dispatch => {
  return api
    .removeComment(comment)
    .then(dispatch({ type: actions.REMOVE_COMMENT, payload: comment }))
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
