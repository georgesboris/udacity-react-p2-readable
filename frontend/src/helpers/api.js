import unfetch from "unfetch"

/**
 * CONSTANTS
 */

const API_URL = "http://localhost:3001"
const Authorization = "whateva-will-be"
const headers = method =>
  method === "GET"
    ? { Authorization }
    : { Authorization, "Content-Type": "application/json" }

/**
 * CURRIED FETCH
 */

const fetch = (url, params, method) =>
  unfetch(API_URL + url, {
    method: method ? method : !params ? "GET" : "POST",
    headers: headers(method)
  }).then(res => (res.json ? res.json() : res))

/**
 * API METHODS
 */

export const fetchCategories = () => fetch("/categories")
export const fetchPosts = () => fetch("/posts")
export const fetchCategoryPosts = category => fetch(`/${category}/posts`)

export const createPost = post => fetch("/posts", post)
export const fetchPost = postId => fetch(`/posts/${postId}`)
export const updatePost = (postId, post) =>
  fetch(`/posts/${postId}`, post, "PUT")
export const removePost = postId => fetch(`/posts/${postId}`, null, "DELETE")

export const votePost = postId => vote => fetch(`/posts/${postId}`, { vote })
export const fetchPostComments = postId => fetch(`/posts/${postId}/comments`)

export const createComment = comment => fetch(`/comments`, comment)
export const fetchComment = commentId => fetch(`/comments/${commentId}`)
export const voteComment = commentId => vote =>
  fetch(`/comments/${commentId}`, { vote })
export const updateComment = (commentId, comment) =>
  fetch(`/comments/${commentId}`, { comment }, "PUT")
export const removeComment = commentId =>
  fetch(`/comments/${commentId}`, null, "DELETE")
