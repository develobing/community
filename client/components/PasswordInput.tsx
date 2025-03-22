import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import InputField from './InputField';
import { TextInputProps } from 'react-native';

interface PasswordInputProps {
  submitBehavior?: TextInputProps['submitBehavior'];
}

function PasswordInput({
  submitBehavior = 'blurAndSubmit',
}: PasswordInputProps) {
  const { control, setFocus } = useFormContext();

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
      render={({ field: { ref, value, onChange }, fieldState: { error } }) => (
        <InputField
          ref={ref}
          label="비밀번호"
          placeholder="비밀번호를 입력해주세요."
          textContentType="oneTimeCode"
          secureTextEntry={true}
          submitBehavior={submitBehavior}
          value={value}
          error={error?.message}
          onChangeText={onChange}
          onSubmitEditing={() => setFocus('passwordConfirm')}
        />
      )}
    />
  );
}

export default PasswordInput;
