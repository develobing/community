import { getMe, postLogin, postSignup } from '@/api/auth';
import queryClient from '@/api/queryClient';
import { queryKeys } from '@/constants';
import { removeHeader, setHeader } from '@/utils/header';
import {
  deleteSecureStore,
  getSecureStore,
  saveSecureStore,
} from '@/utils/secureStore';
import { useMutation, useQuery } from '@tanstack/react-query';
import { router } from 'expo-router';
import { useEffect } from 'react';

function useSignup() {
  return useMutation({
    mutationFn: postSignup,
    onSuccess: () => router.replace('/auth/login'),
    onError: () => {},
    onSettled: () => {},
  });
}

function useLogin() {
  return useMutation({
    mutationFn: postLogin,
    onSuccess: async ({ accessToken }) => {
      setHeader('Authorization', `Bearer ${accessToken}`);
      await saveSecureStore('accessToken', accessToken);
      queryClient.fetchQuery({ queryKey: [queryKeys.AUTH, queryKeys.GET_ME] });
      router.replace('/');
    },
    onError: () => {},
  });
}

function useGetMe() {
  const { data, isError, isSuccess } = useQuery({
    queryFn: getMe,
    queryKey: [queryKeys.AUTH, queryKeys.GET_ME],
  });

  useEffect(() => {
    (async () => {
      if (isSuccess) {
        const accessToken = await getSecureStore('accessToken');
        setHeader('Authorization', `Bearer ${accessToken}`);
      }
    })();
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      removeHeader('Authorization');
      deleteSecureStore('accessToken');
    }
  }, [isError]);

  return { data };
}

function useAuth() {
  const loginMutation = useLogin();
  const signupMutation = useSignup();
  const { data } = useGetMe();

  const logout = () => {
    removeHeader('Authorization');
    deleteSecureStore('accessToken');
    queryClient.resetQueries({ queryKey: ['auth'] });
  };

  return {
    auth: { id: data?.id || '', nickname: data?.nickname || '' },
    loginMutation,
    signupMutation,
    logout,
  };
}

export default useAuth;
