import * as SecureStore from 'expo-secure-store';

async function saveSecureStore(key: string, value: string): Promise<void> {
  await SecureStore.setItemAsync(key, value);
}

async function getSecureStore(key: string): Promise<string | null> {
  const storedData = (await SecureStore.getItemAsync(key)) ?? null;
  return storedData;
}

async function deleteSecureStore(key: string) {
  await SecureStore.deleteItemAsync(key);
}

export { saveSecureStore, getSecureStore, deleteSecureStore };
