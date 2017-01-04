import axios from 'axios';

import {
    POST_LIST_GET,
    POST_LIST_GET_SUCCESS,
    POST_LIST_GET_FAILURE,
    POST_GET,
    POST_GET_SUCCESS,
    POST_GET_FAILURE,
    POST_INSERT,
    POST_INSERT_SUCCESS,
    POST_INSERT_FAILURE,
    POST_DELETE,
    POST_DELETE_SUCCESS,
    POST_DELETE_FAILURE,
    POST_UPDATE,
    POST_UPDATE_SUCCESS,
    POST_UPDATE_FAILURE
} from './ActionTypes';

export function postListGetRequest(page){
  return (dispatch) => {

    return axios.get(`/api/list/page={page}`,{page})
  }
}

export function postGetRequest(){

}

export function postInsertRequest(post){
  return (dispatch) => {
    dispatch(postInsert());
    console.log(post);
    return axios.post('/api/post/post', {post})
    .then((response) => {
      dispatch(postInsertSuccess());
    }).catch((error) =>{
      dispatch(postInsertFailure(error.response.data.code));
    });
  };
}

export function postInsert(){
  return {
    type: POST_INSERT
  };
}

export function postInsertSuccess(){
  return {
    type: POST_INSERT_SUCCESS
  };
}

export function postInsertFailure(){
  return {
    type: POST_INSERT_FAILURE
  };
}
