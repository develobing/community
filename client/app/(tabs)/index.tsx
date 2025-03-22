import { router } from 'expo-router';
import { Pressable, SafeAreaView, StyleSheet, Text } from 'react-native';
import CustomButton from '../../components/CustomButton';
import FeedList from '../../components/FeedList';
import { colors } from '@/constants';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <FeedList />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
});
