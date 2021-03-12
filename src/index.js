import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = { users: [], loading: true };
  }

  async componentDidMount() {
    this.setState({
      users: (await axios.get('/api/users')).data,
      loading: false,
    });
  }
  //test
  render() {
    const { users, loading } = this.state;
    if (loading) {
      return '....loading';
    }
    return (
      <ul>
        {users.map((user) => {
          return <li key={user.id}>{user.name}</li>;
        })}
      </ul>
    );
  }
}

render(<App />, document.querySelector('#root'));
