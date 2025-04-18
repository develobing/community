import { colors } from '@/constants';
import { Stack } from 'expo-router';

const SettingLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.GRAY_200 },
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

export default SettingLayout;
