export const SET_CATEGORIES = "readable/SET_CATEGORIES"
export const SET_ORDER_BY = "readable/SET_ORDER_BY"
export const ADD_POST = "readable/ADD_POST"

const initialStore = {
  categories: [],
  orderBy: "voteScore",
  posts: {}
}

export default function(state = initialStore, action) {
  switch (action.type) {
    case SET_CATEGORIES:
      return {
        ...state,
        categories: action.payload
      }
    case SET_ORDER_BY:
      return {
        ...state,
        orderBy: action.payload
      }
    case ADD_POST:
      return {
        ...state,
        posts: {
          ...state.posts,
          [action.payload.id]: action.payload
        }
      }
    default:
      return state
  }
}
