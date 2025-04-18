import SearchFeedList from '@/components/SearchFeedList';
import { colors } from '@/constants';
import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';

interface searchProps {}

function search({}: searchProps) {
  return (
    <SafeAreaView style={styles.container}>
      <SearchFeedList />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
});

export default search;
