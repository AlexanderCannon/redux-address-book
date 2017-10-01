import _ from 'lodash';

import { FETCH_CONTACTS, FETCH_CONTACT, DELETE_CONTACT } from '../actions';

export default function (state = {}, action) {
  switch (action.type) {
    case (FETCH_CONTACT):
      return { ...state, [action.payload.data._id]: action.payload.data }
    case (FETCH_CONTACTS):
      return _.mapKeys(action.payload.data, '_id');
    case(DELETE_CONTACT):
      return _.omit(state, action.payload);
    default:
      return state;
  }
}