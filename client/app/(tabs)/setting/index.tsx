import AuthRoute from '@/components/AuthRoute';
import ListItem from '@/components/ListItem';
import { colors } from '@/constants';
import useAuth from '@/hooks/queries/useAuth';
import { saveSecureStore } from '@/utils/secureStore';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { Entypo, Octicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { SafeAreaView, StyleSheet, View } from 'react-native';

export default function SettingScreen() {
  const { logout } = useAuth();
  const { i18n, t } = useTranslation();
  const { showActionSheetWithOptions } = useActionSheet();

  const handlePressLanguage = () => {
    const options = ['English', '한국어', t('Cancel')];
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            i18n.changeLanguage('en');
            saveSecureStore('language', 'en');
            break;

          case 1:
            i18n.changeLanguage('ko');
            saveSecureStore('language', 'ko');
            break;

          case cancelButtonIndex:
          default:
            break;
        }
      }
    );
  };

  return (
    <AuthRoute>
      <SafeAreaView>
        <View style={styles.space} />
        <ListItem
          title={t('settings.language')}
          icon={<Entypo name="language" size={16} color={colors.BLACK} />}
          onPress={handlePressLanguage}
        />

        <View style={styles.space} />
        <ListItem
          title={t('settings.logout')}
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
