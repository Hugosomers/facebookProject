const INITIAL_STATE = {
  accounts: [],
}

const registerReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case 'ADD_ACCOUNT':
      return {
        ...state,
        accounts: [...state.accounts, action.payload],
      }
    default:
      return state;
  }
}

export default registerReducer;
