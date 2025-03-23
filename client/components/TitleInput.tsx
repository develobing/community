import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import InputField from './InputField';

interface TitleInputProps {}

function TitleInput({}: TitleInputProps) {
  const { control, setFocus } = useFormContext();

  return (
    <Controller
      name="title"
      control={control}
      rules={{
        validate: (data: string) => {
          if (!data) return '제목을 입력해주세요.';
        },
      }}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <InputField
          autoFocus
          label="제목"
          placeholder="제목을 입력해주세요."
          returnKeyType="next"
          autoCapitalize="none"
          submitBehavior="submit"
          value={value}
          error={error?.message}
          onChangeText={onChange}
          onSubmitEditing={() => setFocus('description')}
        />
      )}
    />
  );
}

export default TitleInput;
