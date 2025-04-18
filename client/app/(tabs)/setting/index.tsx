import AuthRoute from '@/components/AuthRoute';
import ListItem from '@/components/ListItem';
import { colors } from '@/constants';
import useAuth from '@/hooks/queries/useAuth';
import { Entypo, Octicons } from '@expo/vector-icons';
import { SafeAreaView, StyleSheet, View } from 'react-native';

export default function SettingScreen() {
  const { logout } = useAuth();

  return (
    <AuthRoute>
      <SafeAreaView>
        <View style={styles.space} />
        <ListItem
          title="언어 설정"
          icon={<Entypo name="language" size={16} color={colors.BLACK} />}
          onPress={logout}
        />

        <View style={styles.space} />
        <ListItem
          title="로그아웃"
          icon={<Octicons name="sign-out" size={16} color={colors.BLACK} />}
          onPress={logout}
        />
      </SafeAreaView>
    </AuthRoute>
  );
}

const styles = StyleSheet.create({
  space: {
    height: 30,
  },
});
