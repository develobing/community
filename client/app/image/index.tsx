import { router, useLocalSearchParams } from 'expo-router';
import { Dimensions, Image, Pressable, StyleSheet, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors } from '@/constants';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ImageZoomScreen() {
  const inset = useSafeAreaInsets();
  const { uri } = useLocalSearchParams<{ uri: string }>();

  return (
    <View style={[styles.container, { marginTop: inset.top + 10 }]}>
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Feather name="arrow-left" size={28} color={colors.WHITE} />
      </Pressable>
      <Image
        source={{ uri }}
        resizeMode="contain"
        style={{
          width: Dimensions.get('window').width,
          height: '100%',
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  backButton: {
    position: 'absolute',
    left: 15,
    zIndex: 1,
    backgroundColor: colors.BLACK,
    width: 40,
    height: 40,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
