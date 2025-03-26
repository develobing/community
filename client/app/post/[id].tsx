import AuthRoute from '@/components/AuthRoute';
import FeedItem from '@/components/FeedItem';
import InputField from '@/components/InputField';
import { colors } from '@/constants';
import useGetPost from '@/hooks/queries/useGetPost';
import { useLocalSearchParams } from 'expo-router';
import {
  Keyboard,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import useCreateComment from '@/hooks/queries/useCreateComment';
import { Fragment, useRef, useState } from 'react';
import CommentItem from '@/components/CommentItem';

export default function PostDetailScreen() {
  const { id } = useLocalSearchParams();
  const { data: post, isPending, isError } = useGetPost(Number(id));
  const createComment = useCreateComment();
  const [content, setContent] = useState('');
  const [parentCommentId, setParentCommentId] = useState<number | null>(null);
  const scrollRef = useRef<ScrollView | null>(null);
  const inputRef = useRef<TextInput | null>(null);

  if (isPending || isError) {
    return <></>;
  }

  const handleReply = (commentId: number) => {
    setParentCommentId(commentId);
    inputRef.current?.focus();
  };

  const handleCancelReply = () => {
    setParentCommentId(null);
    Keyboard.dismiss();
  };

  const handleSubmitComment = () => {
    const commentData = {
      postId: post.id,
      content,
    };

    // 댓글의 답글인 경우
    if (parentCommentId) {
      createComment.mutate({ ...commentData, parentCommentId });
      setContent('');
      handleCancelReply();
      return;
    }

    createComment.mutate(commentData);
    setContent('');

    setTimeout(() => {
      scrollRef.current?.scrollToEnd();
    }, 500);
  };

  return (
    <AuthRoute>
      <SafeAreaView style={styles.container}>
        <KeyboardAwareScrollView
          contentContainerStyle={styles.awareScrollViewContainer}
        >
          <ScrollView
            ref={scrollRef}
            style={{ marginBottom: 75 }}
            contentContainerStyle={styles.scrollViewContainer}
          >
            <View style={{ marginTop: 12 }}>
              <FeedItem post={post} isDetail />
              <Text style={styles.commentCount}>
                댓글 {post.commentCount}개
              </Text>
            </View>

            {post.comments?.map((comment) => (
              <Fragment key={comment.id}>
                <CommentItem
                  comment={comment}
                  parentCommentId={parentCommentId}
                  onReply={handleReply}
                  onCancelReply={handleCancelReply}
                />

                {comment.replies?.map((reply) => (
                  <CommentItem isReply key={reply.id} comment={reply} />
                ))}
              </Fragment>
            ))}
          </ScrollView>

          <View style={styles.commentInputContainer}>
            <InputField
              ref={inputRef}
              returnKeyType="send"
              placeholder={
                parentCommentId ? '답글 남기는 중' : '댓글을 남겨보세요.'
              }
              rightChild={
                <Pressable
                  disabled={!content}
                  style={styles.inputButtonContainer}
                  onPress={handleSubmitComment}
                >
                  <Text style={styles.inputButtonText}>등록</Text>
                </Pressable>
              }
              value={content}
              onSubmitEditing={handleSubmitComment}
              onChangeText={setContent}
            />
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </AuthRoute>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  awareScrollViewContainer: {
    flex: 1,
    backgroundColor: colors.GRAY_200,
  },
  scrollViewContainer: {
    backgroundColor: colors.GRAY_200,
  },
  commentCount: {
    marginTop: 12,
    backgroundColor: colors.WHITE,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    fontWeight: 'bold',
  },
  commentInputContainer: {
    width: '100%',
    borderTopColor: colors.GRAY_200,
    borderTopWidth: StyleSheet.hairlineWidth,
    backgroundColor: colors.WHITE,
    padding: 16,
    bottom: 0,
    position: 'absolute',
  },
  inputButtonContainer: {
    backgroundColor: colors.ORANGE_600,
    padding: 8,
    borderRadius: 5,
  },
  inputButtonText: {
    color: colors.WHITE,
    fontWeight: 'bold',
  },
});
