import { createStore, combineReducers, applyMiddleware } from 'redux';
const LOAD_USERS = 'LOAD_USERS';
const CREATE_USER = 'CREATE_USER';
const LOAD_THINGS = 'LOAD_THINGS';
const SET_VIEW = 'SET_VIEW';
import axios from 'axios';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

//Reducers
const usersReducer = (state = [], action) => {
  if (action.type === LOAD_USERS) {
    state = action.users;
  }
  if (action.type === CREATE_USER) {
    state = [...state, action.user];
  }
  return state;
};

const thingsReducer = (state = [], action) => {
  if (action.type === LOAD_THINGS) {
    state = action.things;
  }
  return state;
};

const viewReducer = (state = [], action) => {
  if (action.type === SET_VIEW) {
    state = action.view;
  }
  return state;
};

//Reducer Combiner

const reducer = combineReducers({
  users: usersReducer,
  things: thingsReducer,
  view: viewReducer,
});

//Create the Store

const store = createStore(reducer, applyMiddleware(thunk, logger));

//Action Creators

const _loadUsers = (users) => {
  return {
    type: LOAD_USERS,
    users,
  };
};

const _loadThings = (things) => {
  return {
    type: LOAD_THINGS,
    things,
  };
};

const loadThings = () => {
  return async (dispatch) => {
    const things = (await axios.get('/api/things')).data;
    dispatch(_loadThings(things));
  };
};

const loadUsers = () => {
  return async (dispatch) => {
    const users = (await axios.get('/api/users')).data;
    dispatch(_loadUsers(users));
  };
};

const setView = (view) => {
  return {
    type: SET_VIEW,
    view,
  };
};

const _createUser = (user) => {
  return {
    type: CREATE_USER,
    user,
  };
};

const createUser = (name) => {
  return async (dispatch) => {
    const user = (await axios.post('/api/users', { name })).data;
    dispatch(_createUser(user));
  };
};

export default store;
export { loadUsers, loadThings, setView, createUser };
