import { colors } from '@/constants';
import { Comment } from '@/types';
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Profile from './Profile';
import useAuth from '@/hooks/queries/useAuth';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import InputField from '@/components/InputField';
import { useActionSheet } from '@expo/react-native-action-sheet';
import useDeleteComment from '@/hooks/queries/useDeleteComment';

interface CommentItemProps {
  comment: Comment;
  isReply?: boolean;
}

function CommentItem({ comment, isReply = false }: CommentItemProps) {
  const { auth } = useAuth();
  const { showActionSheetWithOptions } = useActionSheet();
  const deleteComment = useDeleteComment();

  const handlePressOption = () => {
    const options = ['삭제', '취소'];
    const destructiveButtonIndex = 0;
    const cancelButtonIndex = 1;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
      },
      (selectedIndex) => {
        switch (selectedIndex) {
          case destructiveButtonIndex:
            deleteComment.mutate(comment.id);
            break;
          case cancelButtonIndex:
            break;
          default:
            break;
        }
      }
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        {isReply && (
          <MaterialIcons name="reply" size={24} color={colors.BLACK} />
        )}

        <Profile
          nickname={comment.isDeleted ? '(삭제)' : comment.user.nickname}
          imageUri={comment.isDeleted ? '' : comment.user.imageUri}
          createdAt={comment.createdAt}
          onPress={() => {}}
          option={
            auth.id === comment.user.id &&
            !comment.isDeleted && (
              <Ionicons
                name="ellipsis-vertical"
                size={24}
                color={colors.BLACK}
                onPress={handlePressOption}
              />
            )
          }
        />

        <Text>{comment.content}</Text>
      </View>

      <InputField
        editable={false}
        value={comment.isDeleted ? '삭제된 댓글입니다.' : comment.content}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE,
    padding: 16,
    gap: 12,
    borderColor: colors.GRAY_200,
    borderWidth: 1,
  },

  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
});

export default CommentItem;
