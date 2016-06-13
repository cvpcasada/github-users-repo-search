import {Enum} from 'enumify';

const _actionTypes = [
  'USERS_LIST_REQUEST',
  'USERS_LIST_SUCCESS',
  'USERS_LIST_FAILURE',
  'REPO_REQUEST',
  'REPO_SUCCESS',
  'REPO_FAILURE'

];

class ActionTypes extends Enum {}

ActionTypes.initEnum(_actionTypes);
export default ActionTypes;
