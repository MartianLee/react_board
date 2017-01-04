import axios from 'axios';

export function getPost(postId){
  return axios.get('http://jsonplaceholder.typicode.com/posts/'+postId);
}

export function getComments(postId){
  return axios.get(`http://jsonplaceholder.typicode.com/posts/${postId}/comments`);
}
