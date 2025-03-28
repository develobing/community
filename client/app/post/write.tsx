import CustomButton from '@/components/CustomButton';
import DescriptionInput from '@/components/DescriptionInput';
import TitleInput from '@/components/TitleInput';
import useCreatePost from '@/hooks/queries/useCreatePost';
import { ImageUri, VoteOption } from '@/types';
import { useNavigation } from 'expo-router';
import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import PostWriteFooter from '../../components/PostWriteFooter';
import ImagePreviewList from '@/components/ImagePreviewList';
import VoteModal from '../../components/VoteModal';
import VoteAttached from '@/components/VoteAttached';

interface writeProps {}

type FormValues = {
  title: string;
  description: string;
  imageUris: ImageUri[];
  voteOptions: VoteOption[];
  isVoteOpen: boolean;
  isVoteAttached: boolean;
};

function write({}: writeProps) {
  const navigation = useNavigation();
  const createPost = useCreatePost();

  const postForm = useForm<FormValues>({
    defaultValues: {
      title: '',
      description: '',
      imageUris: [],
      voteOptions: [{ displayPriority: 0, content: '' }],
      isVoteOpen: false,
      isVoteAttached: false,
    },
  });

  const onSubmit = (formValues: FormValues) => {
    createPost.mutate(formValues);
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <CustomButton
          label="저장"
          size="medium"
          variant="standard"
          onPress={postForm.handleSubmit(onSubmit)}
        />
      ),
    });
  }, []);

  return (
    <FormProvider {...postForm}>
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <TitleInput />
        <DescriptionInput />
        <VoteAttached />
        <ImagePreviewList imageUris={postForm.watch().imageUris} />
      </KeyboardAwareScrollView>

      <PostWriteFooter />
      <VoteModal />
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
