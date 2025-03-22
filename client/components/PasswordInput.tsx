import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import InputField from './InputField';

interface PasswordInputProps {}

function PasswordInput({}: PasswordInputProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name="password"
      control={control}
      rules={{
        validate: (data: string) => {
          if (!data) return '비밀번호를 입력해주세요.';
          if (data.length < 8) return '비밀번호는 8자 이상이어야 합니다.';
        },
      }}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <InputField
          secureTextEntry
          label="비밀번호"
          placeholder="비밀번호를 입력해주세요."
          value={value}
          error={error?.message}
          onChangeText={onChange}
        />
      )}
    />
  );
}

export default PasswordInput;
