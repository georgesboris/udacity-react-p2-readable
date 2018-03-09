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

export const fetchPosts = () => dispatch => {
  api.fetchPosts().then(posts => {
    console.log(posts)
  })
}

/**
 * ACTIONS
 */

export const setOrderBy = orderBy => ({
  type: actions.SET_ORDER_BY,
  payload: orderBy
})
