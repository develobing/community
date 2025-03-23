import { Link, Stack } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { colors } from '@/constants';

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
    </Stack>
  );
}
