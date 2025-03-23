import DescriptionInput from '@/components/DescriptionInput';
import TitleInput from '@/components/TitleInput';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

interface writeProps {}

type FormValues = {
  title: string;
  description: string;
};

function write({}: writeProps) {
  const postForm = useForm<FormValues>({
    defaultValues: {
      title: '',
      description: '',
    },
  });

  return (
    <FormProvider {...postForm}>
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <TitleInput />
        <DescriptionInput />
      </KeyboardAwareScrollView>
    </FormProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
    gap: 16,
  },
});

export default write;
