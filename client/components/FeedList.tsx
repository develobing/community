import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import FeedItem from './FeedItem';
import { colors } from '@/constants';

interface FeedListProps {}

const dummyPosts = [
  {
    id: 1,
    userId: 1,
    title: '더미 텍스트 타이틀 111',
    description: '더미 텍스트 내용 asdf 111',
    createdAt: '2025-01-01T00:00:00.000Z',
    author: {
      id: 5,
      nickname: '닉네임',
      imageUri: '',
    },
    imageUris: [],
    likes: [],
    hasVote: false,
    voteCount: 1,
    commentCount: 1,
    viewCount: 1,
  },
  {
    id: 2,
    userId: 2,
    title: '더미 텍스트 타이틀',
    description:
      '더미 텍스트 내용더미 텍스트 내용더미 텍스트 내용더미 텍스트 내용더미 텍스트 내용더미 텍스트 내용더미 텍스트 내용더미 텍스트 내용더미 텍스트 내용더미 텍스트 내용더미 텍스트 내용더미 텍스트 내용더미 텍스트 내용더미 텍스트 내용더미 텍스트 내용더미 텍스트 내용더미 텍스트 내용더미 텍스트 내용더미 텍스트 내용더미 텍스트 내용더미 텍스트 내용더미 텍스트 내용더미 텍스트 내용더미 텍스트 내용더미 텍스트 내용더미 텍스트 내용더미 텍스트 내용',
    createdAt: '2025-01-05T00:00:00.000Z',
    author: {
      id: 5,
      nickname: '닉네임',
      imageUri: '',
    },
    imageUris: [],
    likes: [],
    hasVote: false,
    voteCount: 2,
    commentCount: 2,
    viewCount: 2,
  },
];

function FeedList({}: FeedListProps) {
  return (
    <FlatList
      data={dummyPosts}
      renderItem={({ item }) => <FeedItem post={item} />}
      keyExtractor={(item) => String(item.id)}
      contentContainerStyle={styles.contentContainer}
    />
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 12,
    backgroundColor: colors.GRAY_200,
    gap: 12,
  },
});

export default FeedList;
