import queryClient from '@/api/queryClient';
import useAuth from '@/hooks/queries/useAuth';
import { useReactQueryDevTools } from '@dev-plugins/react-query';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import Toast from 'react-native-toast-message';
import * as Notifications from 'expo-notifications';
import useNotificationObserver from '@/hooks/useNotificationObserver';
import i18n from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';
import { getLocales } from 'expo-localization';
import { Settings } from 'react-native';
import resources from '@/i18n/resources';
import { getSecureStore } from '@/utils/secureStore';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function RootLayout() {
  useReactQueryDevTools(queryClient);

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ActionSheetProvider>
      <QueryClientProvider client={queryClient}>
        <RootNavigator />
        <Toast />
      </QueryClientProvider>
    </ActionSheetProvider>
  );
}

const deviceLanguage = getLocales()[0].languageCode ?? 'ko';

i18n.use(initReactI18next).init({
  resources: resources,
  lng: deviceLanguage,
  fallbackLng: 'ko-Kr',
});

function RootNavigator() {
  const { auth } = useAuth();
  const { t } = useTranslation();

  useNotificationObserver();

  useEffect(() => {
    const loadLanguage = async () => {
      const savedLanguage =
        (await getSecureStore('language')) ?? deviceLanguage;

      if (savedLanguage && savedLanguage !== deviceLanguage) {
        i18n.changeLanguage(savedLanguage);
      }
    };

    loadLanguage();
  }, [i18n]);

  useEffect(() => {
    const { id, nickname } = auth;

    if (id)
      Toast.show({
        type: 'success',
        text1: t('Welcome Message', {
          nickname: nickname ?? '회원',
        }),
      });
  }, [auth.id]);

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="auth" options={{ headerShown: false }} />
      <Stack.Screen name="profile" options={{ headerShown: false }} />
      <Stack.Screen name="post" options={{ headerShown: false }} />
      <Stack.Screen name="image" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
