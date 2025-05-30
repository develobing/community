import { colors } from '@/constants';
import useGetInfiniteLikedPosts from '@/hooks/queries/useGetInfiniteLikedPosts';
import React, { useRef, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import FeedItem from './FeedItem';
import { useScrollToTop } from '@react-navigation/native';

interface LikedFeedListProps {}

function LikedFeedList({}: LikedFeedListProps) {
  const {
    data: posts,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    refetch,
  } = useGetInfiniteLikedPosts();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const ref = useRef<FlatList | null>(null);
  useScrollToTop(ref);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  };

  const handleEndReached = () => {
    if (!hasNextPage || isFetchingNextPage) return;
    fetchNextPage();
  };

  return (
    <FlatList
      ref={ref}
      data={posts?.pages.flat()}
      renderItem={({ item }) => <FeedItem post={item} />}
      keyExtractor={(item) => String(item.id)}
      contentContainerStyle={styles.contentContainer}
      refreshing={isRefreshing}
      onRefresh={handleRefresh}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.5}
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

export default LikedFeedList;
