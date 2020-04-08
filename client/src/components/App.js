import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import StreamCreate from '../components/streams/StreamCreate';
import StreamDelete from '../components/streams/StreamDelete';
import StreamEdit from '../components/streams/StreamEdit';
import StreamList from '../components/streams/StreamList';
import StreamShow from '../components/streams/StreamShow';
import Header from './Header';
import history from '../history';

// react-router-dom cares only about the part of the URL after the base URL.
// For example, in localhost:3000/page-two react-router only cares about /page-two.

// BrowserRouter component has an object called "history" that stores the current URL.
// history sends that URL to BrowserRouter and BrowserRouter sends it to each Route component to see if the path matches up.
// Then you get conditional rendering of the components based on what URL you're on.
// If extractedPath.contains(path) is true, then the component is shown.
// When you write a prop within a component with no value (ex. <Route exact />), exact={true}.

const App = () => {
  return (
    <div className="ui container">
      <Router history={history}>
        <Header />
        <Switch>
          <Route path="/" exact component={StreamList} />
          <Route path="/streams/new" component={StreamCreate} />
          <Route path="/streams/edit/:id" component={StreamEdit} />
          <Route path="/streams/delete/:id" component={StreamDelete} />
          <Route path="/streams/:id" component={StreamShow} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
