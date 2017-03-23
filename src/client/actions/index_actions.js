import * as types from '../constants/constants'

export function setPhrase(phrase) {
  return {
    type: types.SET_PHRASE,
    phrase
  }
}