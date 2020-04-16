import _ from 'lodash';

export default (state = {}, action) => {
  switch (action.type) {
    case 'CREATE_STREAM':
      return { ...state, [action.payload.id]: action.payload };
    case 'DELETE_STREAM':
      return _.omit(state, action.payload);
    case 'EDIT_STREAM':
      return { ...state, [action.payload.id]: action.payload };
    case 'FETCH_STREAMS':
      return { ...state, ..._.mapKeys(action.payload, 'id') };
    case 'FETCH_STREAM':
      return { ...state, [action.payload.id]: action.payload };
    case 'LIKE_STREAM':
      return { ...state, [action.payload.id]: action.payload };
    case 'REMOVE_STREAM_LIKE':
      return { ...state, [action.payload.id]: action.payload };
    default:
      return state;
  }
};
