import axios from 'axios';
export const FETCH_CONTACTS = 'fetch_contacts';
export const FETCH_CONTACT = 'fetch_contact';
export const CREATE_CONTACT = 'create_contact';
export const DELETE_CONTACT = 'delete_contact';

const ROOT_URL = 'https://shrouded-retreat-54300.herokuapp.com'

export function fetchContacts() {
  const request = axios.get(`${ROOT_URL}/contact`);
  return {
    type: FETCH_CONTACTS,
    payload: request
  }
}

export function postContact(values, callback) {
  const request = axios.post(`${ROOT_URL}/contact`, values)
    .then(() => callback());
  return {
    type: CREATE_CONTACT,
    payload: request
  }
}

export function fetchContact(id) {
  const request = axios.get(`${ROOT_URL}/contact/${id}`)
  return {
    type: FETCH_CONTACT,
    payload: request
  }
}

export function deleteContact(id,callback) {
  const request = axios.delete(`${ROOT_URL}/contact/${id}`)
    .then(() => callback());
  return {
    type: DELETE_CONTACT,
    payload: id
  }
}