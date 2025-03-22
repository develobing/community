import { colors } from '@/constants';
import React from 'react';
import { Pressable, PressableProps, StyleSheet, Text } from 'react-native';

interface CustomButtonProps extends PressableProps {
  label: string;
  size?: 'medium' | 'large';
  variant?: 'filled' | 'outlined';
}

function CustomButton({
  label,
  size = 'large',
  variant = 'filled',
  onPress,
}: CustomButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        styles[size],
        styles[variant],
        pressed && styles.pressed,
      ]}
      onPress={onPress}
    >
      <Text style={styles[variant]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },

  large: {
    width: '100%',
    height: 44,
  },

  medium: {
    width: '100%',
    height: 44,
  },

  filled: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.WHITE,
    backgroundColor: colors.ORANGE_600,
  },

  outlined: {
    borderWidth: 1,
    borderColor: '#000',
  },

  pressed: {
    opacity: 0.8,
  },
});

export default CustomButton;
