import { colors } from '@/constants';
import { Stack } from 'expo-router';

const MyLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.WHITE },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: '내 프로필',
          headerShown: false,
        }}
      ></Stack.Screen>
    </Stack>
  );
};

export default MyLayout;
