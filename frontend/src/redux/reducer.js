import omit from "lodash/omit"

export const SET_CATEGORIES = "readable/SET_CATEGORIES"
export const SET_ORDER_BY = "readable/SET_ORDER_BY"
export const ADD_POST = "readable/ADD_POST"
export const REMOVE_POST = "readable/REMOVE_POST"
export const SET_COMMENTS = "readable/SET_COMMENTS"
export const UPDATE_COMMENT = "readable/UPDATE_COMMENT"
export const ADD_COMMENT = "readable/ADD_COMMENT"
export const REMOVE_COMMENT = "readable/REMOVE_COMMENT"

export const MODAL_HIDE = "readable/MODAL_HIDE"
export const MODAL_CREATE_POST = "readable/MODAL_CREATE_POST"
export const MODAL_UPDATE_POST = "readable/MODAL_UPDATE_POST"
export const MODAL_CREATE_COMMENT = "readable/MODAL_CREATE_COMMENT"
export const MODAL_UPDATE_COMMENT = "readable/MODAL_UPDATE_COMMENT"

const initialStore = {
  categories: [],
  orderBy: "voteScore",
  posts: {},
  comments: {},
  modal: null
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
    case REMOVE_POST:
      return {
        ...state,
        posts: omit(state.posts, action.payload.id)
      }
    case SET_COMMENTS:
      return {
        ...state,
        comments: {
          ...state.comments,
          [action.payload.postId]: action.payload.comments
        }
      }
    case ADD_COMMENT:
      return {
        ...state,
        comments: {
          ...state.comments,
          [action.payload.parentId]: state.comments[action.payload.parentId]
            ? state.comments[action.payload.parentId].concat(action.payload)
            : [action.payload]
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
    case REMOVE_COMMENT:
      return {
        ...state,
        comments: {
          ...state.comments,
          [action.payload.parentId]: state.comments[action.payload.parentId]
            ? state.comments[action.payload.parentId].filter(
                o => o.id !== action.payload.id
              )
            : []
        }
      }

    case MODAL_HIDE:
      return {
        ...state,
        modal: null
      }

    case MODAL_CREATE_POST:
      return {
        ...state,
        modal: { type: "CREATE_POST" }
      }

    case MODAL_UPDATE_POST:
      return {
        ...state,
        modal: { type: "UPDATE_POST", payload: { postId: action.payload.id } }
      }

    case MODAL_CREATE_COMMENT:
      return {
        ...state,
        modal: {
          type: "CREATE_COMMENT",
          payload: { parentId: action.payload.parentId }
        }
      }

    case MODAL_UPDATE_COMMENT:
      return {
        ...state,
        modal: { type: "UPDATE_COMMENT", payload: { comment: action.payload } }
      }

    default:
      return state
  }
}
