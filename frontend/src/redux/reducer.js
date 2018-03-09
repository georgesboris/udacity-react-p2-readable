export const SET_CATEGORIES = "readable/SET_CATEGORIES"
export const SET_ORDER_BY = "readable/SET_ORDER_BY"

const initialStore = {
  categories: [],
  orderBy: "votes"
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
    default:
      return state
  }
}
