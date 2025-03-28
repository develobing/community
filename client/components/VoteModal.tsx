import { colors } from '@/constants';
import React from 'react';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import {
  Modal,
  StyleSheet,
  View,
  SafeAreaView,
  Pressable,
  Text,
  Alert,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import VoteInput from './VoteInput';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { VoteOption } from '@/types';

interface VoteModalProps {}

function VoteModal({}: VoteModalProps) {
  const { control, setValue } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'voteOptions',
  });
  const [voteOptions, isVoteOpen] = useWatch({
    control,
    name: ['voteOptions', 'isVoteOpen'],
  });

  const handleAppendVote = () => {
    const priority = voteOptions.map(
      (vote: VoteOption) => vote.displayPriority
    );
    const nextPriority = Math.max(...priority) + 1;
    const newVote = {
      displayPriority: nextPriority,
      content: '',
    };
    append(newVote);
  };

  const handleSubmit = () => {
    if (voteOptions.length < 2) {
      Alert.alert('투표 항목을 2개 이상 입력해주세요.');
      return;
    }

    setValue('isVoteOpen', false);
    setValue('isVoteAttached', true);
  };

  return (
    <Modal transparent visible={isVoteOpen} animationType="slide">
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Pressable
            style={styles.headerLeft}
            onPress={() => setValue('isVoteOpen', false)}
          >
            <Feather name="arrow-left" size={28} color={colors.BLACK} />
          </Pressable>

          <Text style={styles.headerTitle}>투표</Text>
          <Text style={styles.headerRight} onPress={handleSubmit}>
            첨부
          </Text>
        </View>

        <KeyboardAwareScrollView
          contentContainerStyle={{ gap: 12, padding: 16 }}
        >
          {fields.map((field, index) => (
            <VoteInput
              key={field.id}
              index={index}
              onRemove={() => remove(index)}
            />
          ))}

          <Pressable onPress={handleAppendVote}>
            <Text style={styles.addVoteText}>항목 추가</Text>
          </Pressable>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.BLACK,
  },
  headerLeft: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  headerRight: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.ORANGE_600,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  addVoteText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.GRAY_500,
    textAlign: 'center',
  },
});

export default VoteModal;
