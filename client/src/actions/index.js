import streams from '../apis/streams';
import history from '../history';

export const signIn = (userId) => {
  return {
    type: 'SIGN_IN',
    payload: userId,
  };
};

export const signOut = (userId) => {
  return {
    type: 'SIGN_OUT',
    payload: userId,
  };
};

export const createStream = (formValues) => async (dispatch, getState) => {
  const { userId } = getState().auth;
  const response = await streams.post('/streams', { ...formValues, userId });
  dispatch({
    type: 'CREATE_STREAM',
    payload: { ...response.data, userId },
  });
  history.push('/');
};

export const fetchStreams = () => async (dispatch) => {
  const response = await streams.get('/streams');
  dispatch({ type: 'FETCH_STREAMS', payload: response.data });
};

export const fetchStream = (streamId) => async (dispatch) => {
  const response = await streams.get(`/streams/${streamId}`);
  dispatch({ type: 'FETCH_STREAM', payload: response.data });
};

export const deleteStream = (streamId) => async (dispatch) => {
  await streams.delete(`/streams/${streamId}`);
  history.push('/');
  dispatch({ type: 'DELETE_STREAM', payload: streamId });
};

export const editStream = (streamId, formValues) => async (dispatch) => {
  const response = await streams.patch(`/streams/${streamId}`, formValues);
  dispatch({ type: 'EDIT_STREAM', payload: response.data });
  history.push('/');
};
