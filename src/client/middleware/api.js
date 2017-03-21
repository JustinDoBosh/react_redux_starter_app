import fetch from 'isomorphic-fetch';
import React from 'react';

const SERVICE_URL = '/api/';
const Headers = {
  'Accept' : 'application/json',
  'Content-Type': 'application/json'
};
export const Methods = {
  POST: 'POST',
  GET: 'GET',
  PUT: 'PUT',
  DELETE: 'DELETE'
};

//executes the actual API call
function callApi(endpoint, method, body){
  const fullUrl = SERVICE_URL + endpoint

  return fetch(fullUrl, {
    credentials: 'include',
    method: method,
    headers: Headers,
    mode: 'cors',
    cache: 'no-cache',
    body: JSON.stringify(body)
  })
  .then(response =>response.json().then(json => ({json, response})))
  .then(({json, response}) => {

    if(!response.ok){
      return Promise.reject(json);
    }

    return json;
  })
}

// Action key that carries API call info interpreted by this middleware.
export const CALL_API = Symbol('Call API');

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export const api = store => next => action => {
  const callAPI = action[CALL_API];
  if (typeof callAPI === 'undefined') {
    return next(action)
  }

  let { endpoint } = callAPI;

  const { schema, types, method, body } = callAPI;

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState())
  }

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.')
  }

  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.')
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.')
  }

  //returns a new action with types array stripped from the action and new data
  function actionWith(data) {
    //create a new action that fits Redux
    const finalAction = Object.assign({}, action, data);
    //strip the symbol dictionary
    delete finalAction[CALL_API];
    //return the new action
    return finalAction
  }

  // extract the types as constants from the array
  // (ES6 Syntax - Extracts items from arrays if you know their position)
  const [ requestType, successType, failureType ] = types;

  //create and execute action with request type
  next(actionWith({ type: requestType }));


  return callApi(endpoint, method, schema, body)
    .then(
      //create a new action with response data and a type
      response => next(actionWith({
        response,
        endpoint,
        type: successType,
        isLoading: false,
        isInitialLoad: false
      }))
      ,
      //create a new action with error message and a type
      error => next(actionWith({
        type: failureType,
        endpoint,
        error: error.message || 'Something bad happened',
        isLoading: false,
        isInitialLoad: false
      }))
    )
};
