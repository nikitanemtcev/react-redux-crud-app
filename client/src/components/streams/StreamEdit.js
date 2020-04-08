import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';

import StreamForm from './StreamForm';
import { fetchStream, editStream } from '../../actions';

class StreamEdit extends React.Component {
  // Action creator runs b/c so that when you refresh the page, state doesn't vanish.
  // Remember how he said every component should fetch its own data? That's what he was talking about.
  // If state vanished, then you wouldn't be able to access that specific stream in the first place.
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  // Making an actual onSubmit handler is always a good convention to follow.
  onSubmit = (formValues) => {
    this.props.editStream(this.props.stream.id, formValues);
  };

  render() {
    return (
      <div>
        <h3>Edit a Stream</h3>
        <StreamForm
          initialValues={_.pick(this.props.stream, 'title', 'description')}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream, editStream })(
  StreamEdit
);
