// @flow

import type {
  Post,
  PostCreating,
  Comment,
  CommentCreating,
  Category,
  VoteOption
} from "../redux/reducer"
import unfetch from "unfetch"

/**
 * Types
 */

export type MaybePostResponse = Post | {| error: string |} | {||} | null

/**
 * CONSTANTS
 */

const API_URL = "https://udacity-react-p2-readable.herokuapp.com"
const Authorization = "whateva-will-be-will-be"
const headers = method =>
  method === "GET"
    ? { Authorization }
    : { Authorization, "Content-Type": "application/json" }

/**
 * CURRIED FETCH
 */

const fetch = (url: string, params?: ?Object, method?: string): Promise<*> =>
  unfetch(API_URL + url, {
    method: method ? method : !params ? "GET" : "POST",
    headers: headers(method),
    body: params ? JSON.stringify(params) : null
  }).then(res => (res.json ? res.json() : res))

/**
 * API METHODS
 */

export const fetchCategories = (): Promise<{ categories: Array<Category> }> =>
  fetch("/categories")

export const fetchPosts = (): Promise<Array<Post>> => fetch("/posts")

export const fetchCategoryPosts = (category: string): Promise<Array<Post>> =>
  fetch(`/${category}/posts`)

export const createPost = (post: PostCreating): Promise<Post> =>
  fetch("/posts", post)

export const fetchPost = (postId: string): Promise<MaybePostResponse> =>
  fetch(`/posts/${postId}`)

export const updatePost = (post: Post): Promise<Post> =>
  fetch(`/posts/${post.id}`, post, "PUT")

export const removePost = (postId: string): Promise<Post> =>
  fetch(`/posts/${postId}`, null, "DELETE")

export const votePost = (postId: string, option: VoteOption) =>
  fetch(`/posts/${postId}`, { option })

export const fetchPostComments = (postId: string): Promise<Array<Comment>> =>
  fetch(`/posts/${postId}/comments`)

export const createComment = (comment: CommentCreating): Promise<Comment> =>
  fetch(`/comments`, comment)

export const fetchComment = (commentId: string): Promise<Comment> =>
  fetch(`/comments/${commentId}`)

export const voteComment = (
  commentId: string,
  option: VoteOption
): Promise<Comment> => fetch(`/comments/${commentId}`, { option })

export const updateComment = (comment: Comment): Promise<Comment> =>
  fetch(`/comments/${comment.id}`, comment, "PUT")

export const removeComment = (commentId: string): Promise<Comment> =>
  fetch(`/comments/${commentId}`, null, "DELETE")
