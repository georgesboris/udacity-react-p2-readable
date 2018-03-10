export const SET_CATEGORIES = "readable/SET_CATEGORIES"
export const SET_ORDER_BY = "readable/SET_ORDER_BY"
export const ADD_POST = "readable/ADD_POST"
export const SET_COMMENTS = "readable/SET_COMMENTS"
export const UPDATE_COMMENT = "readable/UPDATE_COMMENT"

const initialStore = {
  categories: [],
  orderBy: "voteScore",
  posts: {},
  comments: {}
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
    case SET_COMMENTS:
      return {
        ...state,
        comments: {
          ...state.comments,
          [action.payload.postId]: action.payload.comments
        }
      }
    case UPDATE_COMMENT:
      return {
        ...state,
        comments: {
          ...state.comments,
          [action.payload.parentId]: state.comments[action.payload.parentId]
            ? state.comments[action.payload.parentId].map(
                o => (o.id === action.payload.id ? action.payload : o)
              )
            : [action.payload]
        }
      }
    default:
      return state
  }
}
