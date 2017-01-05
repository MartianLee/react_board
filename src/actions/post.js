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

export function postListGetRequest(isInitial, listType, id, page){
  return (dispatch) => {
    dispatch(postListGet());
    let url = '/api/post/list/page=1';
    return axios.get('/api/post/list/page=1')
    .then((response) => {
      dispatch(postListGetSuccess(response.data,isInitial,listType));
    }).catch((error) => {
      dispatch(postListGetFailure());
    })
  }
}

export function postListGet(){
  return{
    type: POST_LIST_GET
  };
}


export function postListGetSuccess(data, isInitial, listType){
  return{
    type: POST_LIST_GET_SUCCESS,
    data,
    isInitial,
    listType
  };
}


export function postListGetFailure(){
  return{
    type: POST_LIST_GET_FAILURE
  };
}


export function postGetRequest(key){
  console.log("되라좀 ㅜㅜ");
  return (dispatch) => {
    dispatch(postGet());
    key="586da15753d4ed552434f6a7";
    return axios.get('/api/post/view/'+ key)
    .then((response) => {
      dispatch(postGetSuccess(response.data));
    }).catch((error) => {
      dispatch(postGetFailure());
    })
  }
}
export function postGet(){
  return{
    type: POST_GET
  };
}
export function postGetSuccess(){
  console.log("석세스!!");
  return{
    type: POST_GET_SUCCESS
  };
}

export function postGetFailure(){
  return{
    type: POST_LIST_GET_FAILURE
  };
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
