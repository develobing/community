import { Profile } from '@/types';
import { getSecureStore } from '@/utils/secureStore';
import axiosInstance from './axios';

type RequestUser = {
  email: string;
  password: string;
};

async function postSignup(payload: RequestUser): Promise<void> {
  const { data } = await axiosInstance.post('/auth/signup', payload);
  return data;
}

async function postLogin(
  payload: RequestUser
): Promise<{ accessToken: string }> {
  const { data } = await axiosInstance.post('/auth/signin', payload);
  return data;
}

async function getMe(): Promise<Profile> {
  const accessToken = await getSecureStore('accessToken');
  const { data } = await axiosInstance.get('/auth/me', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return data;
}

export { getMe, postLogin, postSignup };
