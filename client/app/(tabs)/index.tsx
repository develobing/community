import { router } from 'expo-router';
import { Pressable, SafeAreaView, Text } from 'react-native';

export default function HomeScreen() {
  return (
    <SafeAreaView>
      <Pressable onPress={() => router.push('/my')}>
        <Text>홈 스크린</Text>
      </Pressable>
    </SafeAreaView>
  );
}
