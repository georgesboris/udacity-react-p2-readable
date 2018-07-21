// @flow

import type {
  Post,
  PostCreating,
  Comment,
  CommentCreating,
  VoteOption,
  OrderByOption
} from "./reducer"
import type { MaybePostResponse } from "../helpers/api"

import * as api from "../helpers/api"
import * as actions from "./reducer"
import uuid from "uuid"

/**
 * ACTIONS
 */

function _addPost(post: Post) {
  return { type: actions.ADD_POST, payload: post }
}

function _addComment(comment: Comment) {
  return { type: actions.ADD_COMMENT, payload: comment }
}

export function hideModal() {
  return { type: actions.MODAL_HIDE }
}

export function showCreatePostModal() {
  return { type: actions.MODAL_CREATE_POST }
}

export function showUpdatePostModal(postId: string) {
  return { type: actions.MODAL_UPDATE_POST, payload: { id: postId } }
}

export function showCreateCommentModal(parentId: string) {
  return { type: actions.MODAL_CREATE_COMMENT, payload: { parentId } }
}

export function showUpdateCommentModal(comment: Comment) {
  return { type: actions.MODAL_UPDATE_COMMENT, payload: comment }
}

/**
 * ASYNC ACTIONS
 */

export const fetchCategories = () => (dispatch: Function) => {
  api.fetchCategories().then(({ categories }) => {
    dispatch({ type: actions.SET_CATEGORIES, payload: categories })
  })
}

export const fetchPosts = () => (dispatch: Function) => {
  api.fetchPosts().then(posts => {
    posts.forEach(post => dispatch(_addPost(post)))
  })
}

export const fetchCategoryPosts = (category: string) => (
  dispatch: Function
) => {
  api.fetchCategoryPosts(category).then((posts: Array<Post>) => {
    posts.forEach(post => dispatch(_addPost(post)))
  })
}

export const fetchPost = (postId: string) => async (dispatch: Function) => {
  const fetchPost = api.fetchPost(postId)
  const fetchPostComments = api.fetchPostComments(postId)

  try {
    const res: [MaybePostResponse, Array<Comment>] = await Promise.all([
      fetchPost,
      fetchPostComments
    ])

    const post = res[0]
    const comments = res[1]

    if (!post || !post.id || post.error || post.deleted) {
      return
    }

    dispatch(_addPost(post))
    dispatch({
      type: actions.SET_COMMENTS,
      payload: { postId, comments }
    })

    return post
  } catch (e) {
    return e
  }
}

export const createPost = (post: PostCreating) => (dispatch: Function) => {
  return api
    .createPost({
      ...post,
      id: uuid.v4(),
      timestamp: Date.now()
    })
    .then((post: Post) => dispatch(_addPost(post)))
}

export const updatePost = (post: Post) => (dispatch: Function) => {
  return api.updatePost(post).then(() => dispatch(_addPost(post)))
}

export const removePost = (postId: string) => (dispatch: Function) => {
  return api
    .removePost(postId)
    .then(() =>
      dispatch({ type: actions.REMOVE_POST, payload: { id: postId } })
    )
}

export const votePost = (postId: string, option: VoteOption) => (
  dispatch: Function
) => {
  api.votePost(postId, option).then((post: Post) => {
    dispatch(_addPost(post))
  })
}

export const createComment = (comment: CommentCreating) => (
  dispatch: Function
) => {
  return api
    .createComment({
      ...comment,
      id: uuid.v4(),
      timestamp: Date.now()
    })
    .then(comment => dispatch(_addComment(comment)))
}

export const updateComment = (comment: Comment) => (dispatch: Function) => {
  return api.updateComment(comment).then(() => {
    dispatch({ type: actions.UPDATE_COMMENT, payload: comment })
  })
}

export const removeComment = (comment: Comment) => (dispatch: Function) => {
  return api.removeComment(comment.id).then(() => {
    dispatch({ type: actions.REMOVE_COMMENT, payload: comment })
  })
}

export const voteComment = (commentId: string, option: VoteOption) => (
  dispatch: Function
) => {
  api.voteComment(commentId, option).then(comment => {
    dispatch({ type: actions.UPDATE_COMMENT, payload: comment })
  })
}

/**
 * ACTIONS
 */

export const setOrderBy = (orderBy: OrderByOption) => ({
  type: actions.SET_ORDER_BY,
  payload: orderBy
})
