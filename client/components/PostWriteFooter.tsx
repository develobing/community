import { colors } from '@/constants';
import React from 'react';
import { StyleSheet, View, Pressable, Alert } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import useUploadImages from '@/hooks/queries/useUploadImages';
import { getFormDataImages } from '@/utils/image';
import { useFormContext, useWatch } from 'react-hook-form';

interface PostWriteFooterProps {}

function PostWriteFooter({}: PostWriteFooterProps) {
  const inset = useSafeAreaInsets();
  const { control, setValue } = useFormContext();
  const [imageUris] = useWatch({ control, name: ['imageUris'] });
  const uploadImages = useUploadImages();

  const addImageUris = (uris: string[]) => {
    const newImageUris = [...imageUris, ...uris.map((uri) => ({ uri }))];
    if (newImageUris.length > 5) {
      Alert.alert('이미지 개수 초과', '이미지는 최대 5개까지 추가 가능합니다.');
      return;
    }

    setValue('imageUris', newImageUris);
  };

  const handleOpenImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images',
      allowsMultipleSelection: true,
    });
    if (result.canceled) return;

    const formData = getFormDataImages('images', result.assets);
    uploadImages.mutate(formData, {
      onSuccess: (data: string[]) => addImageUris(data),
    });
  };

  return (
    <View style={[styles.container, { paddingBottom: inset.bottom }]}>
      <Pressable style={styles.footerIcon} onPress={handleOpenImagePicker}>
        <Ionicons name="camera" size={20} color={colors.BLACK} />
      </Pressable>

      <Pressable
        style={styles.footerIcon}
        onPress={() => setValue('isVoteOpen', true)}
      >
        <MaterialCommunityIcons name="vote" size={20} color={colors.BLACK} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 12,
    bottom: 12,
    paddingHorizontal: 16,
    backgroundColor: colors.WHITE,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.GRAY_300,
    flexDirection: 'row',
    gap: 10,
  },

  footerIcon: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: colors.GRAY_100,
  },
});

export default PostWriteFooter;
