import { colors } from '@/constants';
import useAuth from '@/hooks/queries/useAuth';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, SafeAreaView, StyleSheet } from 'react-native';
import FeedList from '../../components/FeedList';

export default function HomeScreen() {
  const { auth } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <FeedList />

      {auth.id && (
        <Pressable
          style={styles.writeButton}
          onPress={() => router.push('/post/write')}
        >
          <Ionicons name="pencil" size={32} color={colors.WHITE} />
        </Pressable>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },

  writeButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.ORANGE_600,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 3,
    shadowOpacity: 0.3,
    elevation: 2,
  },
});
