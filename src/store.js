import { createStore } from 'redux';

const storeInit = {
  userFirstname: '',
}

const reducer = (state, action) => {
  if(action.type==='SESSION_OPEN'){
    return {
      ...state,
      userFirstname: action.userFirstname,
    };
  }
  return state;
}

export default createStore(reducer, storeInit);