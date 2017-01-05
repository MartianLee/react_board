import * as types from 'actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
    post:{
      status: 'INIT',
      error: -1
    },
    list:{
      status: 'INIT',
      data: [],
      isLast: false
    },
    postget:{
      status: 'INIT',
      data: [],
      isLast: false
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
      case types.POST_LIST_GET:
        return update(state, {
          list:{
            status: {$set:'WAITING'}
          }
        })
      case types.POST_LIST_GET_SUCCESS:
        return update(state, {
          list:{
            status: {$set:'SUCCESS'},
            data: {$set:action.data},
            isLast: {$set: action.data.length < 6}
          }
        })
      case types.POST_LIST_GET_FAILURE:
        return update(state, {
          list:{
            status: {$set:'FAILURE'},
          }
        })
      case types.POST_GET:
        return update(state, {
          list:{
            status: {$set:'WAITING'}
          }
        })
      case types.POST_GET_SUCCESS:
        return update(state, {
          postget:{
            status: {$set:'SUCCESS'},
            data: {$set:action.data},
            isLast: {$set: action.data.length < 6}
          }
        })
      case types.POST_GET_FAILURE:
        return update(state, {
          list:{
            status: {$set:'FAILURE'},
          }
        })
      default:
        return state;
    }
    return state;
}
