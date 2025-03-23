import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import InputField from './InputField';

interface DescriptionInputProps {}

function DescriptionInput({}: DescriptionInputProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name="description"
      control={control}
      rules={{
        validate: (data: string) => {
          if (data.length < 5) return '내용을 5자 이상 입력해주세요.';
        },
      }}
      render={({ field: { ref, value, onChange }, fieldState: { error } }) => (
        <InputField
          multiline
          ref={ref}
          label="내용"
          placeholder="내용을 입력해주세요."
          returnKeyType="next"
          autoCapitalize="none"
          value={value}
          error={error?.message}
          onChangeText={onChange}
        />
      )}
    />
  );
}

export default DescriptionInput;
