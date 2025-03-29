import { colors } from '@/constants';
import { Comment } from '@/types';
import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import Profile from './Profile';
import useAuth from '@/hooks/queries/useAuth';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import InputField from '@/components/InputField';
import { useActionSheet } from '@expo/react-native-action-sheet';
import useDeleteComment from '@/hooks/queries/useDeleteComment';
import { router } from 'expo-router';

interface CommentItemProps {
  comment: Comment;
  parentCommentId?: number | null;
  isReply?: boolean;
  onReply?: (commentId: number) => void;
  onCancelReply?: () => void;
}

function CommentItem({
  comment,
  parentCommentId,
  isReply = false,
  onReply,
  onCancelReply,
}: CommentItemProps) {
  const { auth } = useAuth();
  const { showActionSheetWithOptions } = useActionSheet();
  const deleteComment = useDeleteComment();

  const getCommentBackground = () => {
    if (parentCommentId === comment.id) {
      return colors.ORANGE_100;
    }
    if (isReply) {
      return colors.GRAY_50;
    }
    return colors.WHITE;
  };

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
    <View
      style={[styles.container, { backgroundColor: getCommentBackground() }]}
    >
      <View style={styles.profileContainer}>
        {isReply && (
          <MaterialCommunityIcons
            name="arrow-right-bottom"
            size={24}
            color={colors.BLACK}
          />
        )}

        <Profile
          nickname={comment.isDeleted ? '(삭제)' : comment.user.nickname}
          imageUri={comment.isDeleted ? '' : comment.user.imageUri}
          createdAt={comment.createdAt}
          onPress={() => {
            if (!comment.isDeleted) {
              router.push(`/profile/${comment.user.id}`);
            }
          }}
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
      </View>

      <InputField
        editable={false}
        value={comment.isDeleted ? '삭제된 댓글입니다.' : comment.content}
      />

      {!comment.isDeleted && !isReply && (
        <View style={styles.replyButtonContainer}>
          <Pressable onPress={() => onReply?.(comment.id)}>
            <Text style={styles.replyButton}>답글 남기기</Text>
          </Pressable>

          {parentCommentId === comment.id && (
            <Pressable onPress={onCancelReply}>
              <Text style={styles.cancelButton}>취소</Text>
            </Pressable>
          )}
        </View>
      )}
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

  replyButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  replyButton: {
    fontWeight: 'bold',
    color: colors.ORANGE_600,
    fontSize: 12,
  },
  cancelButton: {
    fontWeight: 'bold',
    color: colors.BLACK,
    fontSize: 12,
  },
});

export default CommentItem;
