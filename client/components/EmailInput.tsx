import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import InputField from './InputField';

interface EmailInputProps {}

function EmailInput({}: EmailInputProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name="email"
      control={control}
      rules={{
        validate: (data: string) => {
          if (!data) return '이메일을 입력해주세요.';

          if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(data))
            return '올바른 이메일 형식이 아닙니다.';
        },
      }}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <InputField
          label="이메일"
          placeholder="이메일을 입력해주세요."
          value={value}
          error={error?.message}
          onChangeText={onChange}
        />
      )}
    />
  );
}

export default EmailInput;
