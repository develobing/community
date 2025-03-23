import { CreatePostDto, Post } from '@/types';
import axiosInstance from './axios';

async function getPosts(page = 1): Promise<Post[]> {
  const { data } = await axiosInstance.get(`/posts?page=${page}`);
  return data;
}

async function createPost(body: CreatePostDto) {
  const { data } = await axiosInstance.post('/posts', body);
  return data;
}

export { getPosts, createPost };
