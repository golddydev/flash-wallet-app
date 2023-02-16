import { SET_DEAD_FUNCTION_INFO, SET_WILL_INFO } from '../types';

const initialState = {
  will: {},
  legacy: [],
};

const DeadFunctionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DEAD_FUNCTION_INFO: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case SET_WILL_INFO: {
      return {
        ...state,
        will: {
          ...state.will,
          ...action.payload,
        },
      };
    }
    default: {
      return state;
    }
  }
};

export default DeadFunctionReducer;
