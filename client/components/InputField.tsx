import { colors } from '@/constants';
import React, { ForwardedRef, forwardRef, ReactNode } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';

interface InputFieldProps extends TextInputProps {
  label?: string;
  variant?: 'filled' | 'standard' | 'outlined';
  error?: string;
  rightChild?: ReactNode;
}

function InputField(
  { label, variant = 'filled', error, rightChild, ...props }: InputFieldProps,
  ref?: ForwardedRef<TextInput>
) {
  return (
    <View>
      {label && <Text style={styles.label}>{label}</Text>}
      <View
        style={[
          styles.container,
          styles[variant],
          props.multiline && styles.multiline,
          error && styles.inputError,
        ]}
      >
        <TextInput
          ref={ref}
          spellCheck={false}
          autoCorrect={false}
          placeholderTextColor={colors.GRAY_500}
          style={[styles.input, styles[`${variant}Text`]]}
          {...props}
        />

        {rightChild}
      </View>

      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 44,
    borderRadius: 8,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  label: {
    fontSize: 12,
    color: colors.GRAY_700,
    marginBottom: 5,
  },
  standard: {
    borderWidth: 1,
    borderColor: colors.GRAY_200,
  },
  outlined: {
    borderWidth: 1,
    borderColor: colors.ORANGE_600,
  },
  filled: {
    backgroundColor: colors.GRAY_100,
  },
  standardText: {
    color: colors.BLACK,
  },
  outlineText: {
    color: colors.ORANGE_600,
    fontWeight: 'bold',
  },
  filledText: {
    color: colors.BLACK,
  },
  input: {
    fontSize: 16,
    padding: 0,
    flex: 1,
  },
  multiline: {
    alignItems: 'flex-start',
    paddingVertical: 10,
    height: 200,
  },
  inputError: {
    borderColor: colors.RED_500,
    borderWidth: 1,
  },
  error: {
    fontSize: 12,
    marginTop: 5,
    color: colors.RED_500,
  },
});

export default forwardRef(InputField);
