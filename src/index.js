import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider, connect } from 'react-redux';
import store, { loadUsers, loadThings, setView, createUser } from './store';
import Nav from './Nav';
import Users from './Users';
import Things from './Things';

const App = connect(
  (state) => {
    return state;
  },
  (dispatch) => {
    return {
      bootstrap: async () => {
        dispatch(loadUsers());
        dispatch(loadThings());
      },
      setView: function (view) {
        dispatch(setView(view));
      },
    };
  }
)(
  class App extends Component {
    componentDidMount() {
      this.props.bootstrap();
      window.addEventListener('hashchange', () => {
        this.props.setView(window.location.hash.slice(1));
      });
    }
    render() {
      const { users, view } = this.props;
      return (
        <div>
          {view}
          <Nav />
          {view === 'users' && <Users />}
          {view === 'things' && <Things />}
        </div>
      );
    }
  }
);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
);
