import React from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import InputField from './InputField';
import { Text } from 'react-native';

interface PasswordConfirmInputProps {}

function PasswordConfirmInput({}: PasswordConfirmInputProps) {
  const { control } = useFormContext();
  const password = useWatch({ control, name: 'password' });

  return (
    <Controller
      name="passwordConfirm"
      control={control}
      rules={{
        validate: (data: string) => {
          if (!data) return '비밀번호 확인을 입력해주세요.';
          if (data.length < 8) return '비밀번호는 8자 이상이어야 합니다.';
          if (data !== password) return '비밀번호가 일치하지 않습니다.';
        },
      }}
      render={({ field: { ref, value, onChange }, fieldState: { error } }) => (
        <InputField
          ref={ref}
          label="비밀번호 확인"
          placeholder="비밀번호 확인을 입력해주세요."
          textContentType="oneTimeCode"
          secureTextEntry={true}
          value={value}
          error={error?.message}
          onChangeText={onChange}
        />
      )}
    />
  );
}

export default PasswordConfirmInput;
