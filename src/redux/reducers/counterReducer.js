import { INCREASE_COUNTER, DESCREASE_COUNTER } from "../actions/counterActions";

const initialState = 5;

const counterReducer = (state = initialState, { type, provider }) => {
  switch (type) {
    case INCREASE_COUNTER:
      return (state = state + 1);
    case DESCREASE_COUNTER:
      return (state = state - 1);
    default:
      return state;
  }
};

export default counterReducer;
