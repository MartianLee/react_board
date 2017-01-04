import * as types from 'actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
    post:{
      status: 'INIT',
      error: -1
    }
};

export default function post(state, action) {
    if(typeof state === "undefined")
        state = initialState;
    /* To be implemented.. */
    switch(action.type){
      case types.POST_INSERT:
        return update(state,{
          post: {
            status: { $set: 'WAITING'},
            error: { $set: - 1 }
          }
        });
      case types.POST_INSERT_SUCCESS:
        return update(state,{
          post: {
            status: { $set: 'SUCCESS'},
          }
        });
      case types.POST_INSERT_FAILURE:
        return update(state,{
          post: {
            status: { $set: 'FAILURE'},
            error: { $set: action.error }
          }
        });
      default:
        return state;
    }
    return state;
}
