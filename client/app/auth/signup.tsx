import { StyleSheet, View } from 'react-native';
import InputField from '../../components/InputField';
import FixedBottomCTA from '@/components/FixedBottomCTA';
import { useState } from 'react';

export default function SignupScreen() {
  const [signupValues, setSignupValues] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
  });
  const [error, setError] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const checkValidation = () => {
    let isValid = true;

    if (!signupValues.email) {
      setError((prev) => ({ ...prev, email: '이메일을 입력해주세요.' }));
      isValid = false;
    }

    if (!signupValues.password) {
      setError((prev) => ({ ...prev, password: '비밀번호를 입력해주세요.' }));
      isValid = false;
    }

    if (!signupValues.passwordConfirm) {
      setError((prev) => ({
        ...prev,
        passwordConfirm: '비밀번호 확인을 입력해주세요.',
      }));
      isValid = false;
    }

    return isValid;
  };

  const handleChange = (key: string, value: string) => {
    setSignupValues((prev) => ({ ...prev, [key]: value }));
    setError((prev) => ({ ...prev, [key]: '' }));
  };

  const handleSubmit = () => {
    console.log('signupValues', signupValues);

    if (!checkValidation()) return;
  };

  return (
    <>
      <View style={styles.container}>
        <InputField
          label="이메일"
          placeholder="이메일을 입력해주세요."
          value={signupValues.email}
          error={error.email}
          onChangeText={(text) => handleChange('email', text)}
        />
        <InputField
          label="비밀번호"
          placeholder="비밀번호을 입력해주세요."
          value={signupValues.password}
          error={error.password}
          onChangeText={(text) => handleChange('password', text)}
        />
        <InputField
          label="비밀번호 확인"
          placeholder="비밀번호 확인을 입력해주세요."
          value={signupValues.passwordConfirm}
          error={error.passwordConfirm}
          onChangeText={(text) => handleChange('passwordConfirm', text)}
        />
      </View>

      <FixedBottomCTA label="회원가입하기" onPress={handleSubmit} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
    gap: 16,
  },
});
