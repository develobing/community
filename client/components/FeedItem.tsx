import { colors } from '@/constants';
import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { Octicons, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { Post } from '@/types';
import Profile from './Profile';
import useAuth from '@/hooks/queries/useAuth';

interface FeedItemProps {
  post: Post;
}

function FeedItem({ post }: FeedItemProps) {
  const { auth } = useAuth();
  const likeUsers = post.likes.map((like) => Number(like.userId));
  const isLiked = likeUsers?.includes(Number(auth?.id));

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Profile
          nickname={post.author.nickname}
          imageUri={post.author.imageUri}
          createdAt={post.createdAt}
          onPress={() => {}}
        ></Profile>

        <Text style={styles.title}>{post.title}</Text>
        <Text numberOfLines={3} style={styles.description}>
          {post.description}
        </Text>
      </View>

      <View style={styles.menuContainer}>
        <Pressable style={styles.menu} onPress={() => {}}>
          <Octicons
            name={isLiked ? 'heart-fill' : 'heart'}
            size={16}
            color={isLiked ? colors.ORANGE_600 : colors.BLACK}
          />
          <Text style={isLiked ? styles.activeMenuText : styles.menuText}>
            {post.likes.length || '좋아요'}
          </Text>
        </Pressable>
        <Pressable style={styles.menu} onPress={() => {}}>
          <MaterialCommunityIcons
            name="comment-processing-outline"
            size={16}
            color={colors.BLACK}
          />
          <Text style={styles.menuText}>{post.commentCount || '댓글'}</Text>
        </Pressable>
        <Pressable style={styles.menu} onPress={() => {}}>
          <Ionicons name="eye-outline" size={16} color={colors.BLACK} />
          <Text style={styles.menuText}>{post.viewCount}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: colors.WHITE },

  contentContainer: { padding: 16 },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.BLACK,
    marginVertical: 8,
  },
  description: {
    fontSize: 16,
    color: colors.BLACK,
    marginBottom: 14,
  },

  menuContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderTopColor: colors.GRAY_300,
    borderTopWidth: StyleSheet.hairlineWidth,
  },

  menu: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    width: '33%',
    gap: 4,
  },

  menuText: {
    fontSize: 14,
    color: colors.GRAY_700,
  },

  activeMenuText: {
    fontWeight: '500',
    color: colors.ORANGE_600,
  },
});

export default FeedItem;
