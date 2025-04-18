import SearchInput from '@/components/SearchInput';
import { colors } from '@/constants';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, Platform, StatusBar, StyleSheet, View } from 'react-native';
import FeedItem from './FeedItem';
import useGetInfiniteSearchPosts from '@/hooks/queries/useGetInfiniteSearchPosts';

interface SearchFeedListProps {}

function SearchFeedList({}: SearchFeedListProps) {
  const [keyword, setKeyword] = useState('');
  const [submitKeyword, setSubmitKeyword] = useState('');
  const {
    data: posts,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    refetch,
  } = useGetInfiniteSearchPosts(submitKeyword);
  const [isRefreshing, setIsRefreshing] = useState(false);

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
    <>
      <View style={styles.inputContainer}>
        <View style={styles.arrowLeft}>
          <Feather
            name="arrow-left"
            size={28}
            color={colors.BLACK}
            onPress={() => router.back()}
          />
        </View>

        <SearchInput
          autoFocus
          value={keyword}
          onChangeText={(text) => setKeyword(text)}
          onSubmit={() => setSubmitKeyword(keyword)}
          onSubmitEditing={() => setSubmitKeyword(keyword)}
          placeholder="글 제목 검색"
        />
      </View>

      <FlatList
        data={posts?.pages.flat()}
        renderItem={({ item }) => <FeedItem post={item} />}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.contentContainer}
        refreshing={isRefreshing}
        onRefresh={handleRefresh}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
      />
    </>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 8,
    paddingHorizontal: 16,
    gap: 8,
    height: 44,
    backgroundColor: colors.WHITE,
    flexDirection: 'row',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },

  arrowLeft: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  contentContainer: {
    paddingVertical: 12,
    backgroundColor: colors.GRAY_200,
    gap: 12,
  },
});

export default SearchFeedList;
