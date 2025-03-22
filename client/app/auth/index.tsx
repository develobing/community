import { SafeAreaView, StyleSheet, Image, View } from 'react-native';
import CustomButton from '../../components/CustomButton';
import { Link, router } from 'expo-router';

export default function AuthScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('@/assets/images/logo.png')}
          style={styles.logo}
        />
      </View>

      <View style={styles.buttonContainer}>
        <CustomButton
          label="이메일 로그인"
          onPress={() => router.push('/auth/login')}
        ></CustomButton>

        <Link href="/auth/signup" style={styles.signUpText}>
          회원가입
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 2,
  },

  logo: {
    width: 112,
    height: 112,
  },

  buttonContainer: {
    flex: 1,
    paddingHorizontal: 32,
  },

  signUpText: {
    textAlign: 'center',
    textDecorationLine: 'underline',
    marginTop: 20,
  },
});
