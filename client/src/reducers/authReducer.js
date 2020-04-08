const INITIAL_STATE = {
  isSignedIn: null,
  userId: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SIGN_IN':
      return { ...state, userId: action.payload, isSignedIn: true };
    case 'SIGN_OUT':
      return { ...state, userId: null, isSignedIn: false };
    default:
      return state;
  }
};
