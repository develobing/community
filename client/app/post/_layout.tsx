import { Link, router, Stack } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { colors } from '@/constants';
import MyScreen from '../(tabs)/my/index';

export default function PostLayout() {
  return (
    <Stack
      screenOptions={{
        headerTintColor: colors.BLACK,
        contentStyle: {
          backgroundColor: colors.WHITE,
        },
      }}
    >
      <Stack.Screen
        name="write"
        options={{
          title: '글쓰기',
          headerShown: true,
          headerLeft: () => (
            <Link replace href="/">
              <Feather name="arrow-left" size={28} color={colors.BLACK} />
            </Link>
          ),
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          headerTitle: '',
          headerShown: true,
          headerLeft: () => (
            <Feather
              name="arrow-left"
              size={28}
              color={colors.BLACK}
              onPress={() =>
                router.canGoBack() ? router.back() : router.replace('/')
              }
            />
          ),
        }}
      />
      <Stack.Screen
        name="update/[id]"
        options={{
          title: '수정',
          headerShown: true,
          headerLeft: () => (
            <Feather
              name="arrow-left"
              size={28}
              color={colors.BLACK}
              onPress={() => router.back()}
            />
          ),
        }}
      />
      <Stack.Screen
        name="search"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
