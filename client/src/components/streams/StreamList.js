import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchStreams } from '../../actions';
import { likeStream, removeLikeFromStream } from '../../actions';

// The reason we create a class-based component is b/c we want to call the componentDidMount lifecycle method.

class StreamList extends React.Component {
  componentDidMount() {
    this.props.fetchStreams();
  }

  renderAdmin = (stream) => {
    if (stream.userId === this.props.currentUserId) {
      return (
        <div style={{ display: 'inline-block' }}>
          <Link to={`/streams/edit/${stream.id}`} className="ui button primary">
            Edit
          </Link>
          <Link
            to={`/streams/delete/${stream.id}`}
            className="ui button negative"
          >
            Delete
          </Link>
        </div>
      );
    }
  };

  renderLikeButton = (stream) => {
    if (this.props.isSignedIn) {
      let userFound = false;
      stream.usersWhoLikedThis.forEach((userId) => {
        if (userId === this.props.currentUserId) {
          userFound = true;
        }
      });

      if (!userFound) {
        return (
          <button
            className="ui button"
            onClick={() =>
              this.props.likeStream(this.props.currentUserId, stream.id)
            }
            style={{
              backgroundColor: '#1abc9c',
              color: '#fff',
              display: 'inline-block',
            }}
          >
            <i className="icon thumbs up" />
            Like
          </button>
        );
      } else {
        return (
          <button
            className="ui button"
            onClick={() =>
              this.props.removeLikeFromStream(
                this.props.currentUserId,
                stream.id
              )
            }
            style={{
              backgroundColor: '#16a085',
              color: '#fff',
              display: 'inline-block',
            }}
          >
            <i className="icon thumbs up" />
            Liked
          </button>
        );
      }
    }

    return null;
  };

  renderStreams() {
    return this.props.streams.map((stream) => {
      return (
        <div className="item" key={stream.id}>
          <div className="right floated content">
            {this.renderLikeButton(stream)}
            {this.renderAdmin(stream)}
          </div>
          <i className="large middle aligned icon camera" />
          <div className="content">
            <Link to={`/streams/${stream.id}`} className="header">
              {stream.title}
            </Link>
            <div className="description">{stream.description}</div>
          </div>
        </div>
      );
    });
  }

  renderCreateButton() {
    if (this.props.isSignedIn) {
      return (
        <div style={{ textAlign: 'right' }}>
          <Link to="/streams/new" className="ui button primary">
            Create Stream
          </Link>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <h2>Streams</h2>
        <div className="ui celled list">{this.renderStreams()}</div>
        {this.renderCreateButton()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    streams: Object.values(state.streams),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn,
  };
};

export default connect(mapStateToProps, {
  fetchStreams,
  likeStream,
  removeLikeFromStream,
})(StreamList);
