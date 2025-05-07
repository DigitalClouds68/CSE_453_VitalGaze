// hooks/useHomeData.ts
import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import Constants from 'expo-constants';
import { useRouter } from 'expo-router';

const API = Constants.expoConfig?.extra?.API_URL || 'https://cse-453-vitalgaze.onrender.com';

export function useHomeData() {
  const [username, setUsername] = useState<string>('');
  const [lastSession, setLastSession] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [menuVisible, setMenuVisible] = useState<boolean>(false);
  const router = useRouter();

  // 清除所有用户相关数据
  const clearAllUserData = useCallback(async () => {
    const keys = ['authToken','userData','userPreferences','lastTrainingSession','username'];
    await AsyncStorage.multiRemove(keys);
    setUsername('');
    setLastSession(null);
  }, []);

  // 处理 Token 过期
  const handleTokenExpired = useCallback(async () => {
    await clearAllUserData();
    Alert.alert(
      'Session Expired',
      'Your session has expired. Please sign in again.',
      [{ text: 'OK', onPress: () => router.push('/(tabs)/signin') }]
    );
  }, [clearAllUserData, router]);

  // 登出
  const handleSignOut = useCallback(() => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign Out',
        onPress: async () => {
          const token = await AsyncStorage.getItem('authToken');
          if (token) {
            try {
              await fetch(`${API}/api/auth/logout`, {
                method: 'POST',
                headers: {
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'application/json'
                }
              });
            } catch { /* ignore server errors */ }
          }
          await clearAllUserData();
          setMenuVisible(false);
          router.push('/(tabs)/signin');
        }
      }
    ]);
  }, [clearAllUserData, router]);

  // 获取用户信息 & 上次训练数据
  useEffect(() => {
    let isMounted = true;
    (async () => {
      setLoading(true);
      try {
        const token = await AsyncStorage.getItem('authToken');
        if (!token) throw new Error('NO_TOKEN');

        // fetch profile
        const res = await fetch(`${API}/api/user/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.status === 401) {
          await handleTokenExpired();
        } else if (res.ok) {
          const { user } = await res.json();
          isMounted && setUsername(user.username);
          await AsyncStorage.setItem('username', user.username);
        } else {
          throw new Error('FETCH_FAILED');
        }

        // fetch last session from storage
        const raw = await AsyncStorage.getItem('lastTrainingSession');
        if (raw) isMounted && setLastSession(JSON.parse(raw));
      } catch (err) {
        if ((err as Error).message === 'NO_TOKEN') {
          router.push('/(tabs)/signin');
        } else {
          // Network error or other errors
          const local = await AsyncStorage.getItem('username');
          if (local) isMounted && setUsername(local);
          else router.push('/(tabs)/signin');
        }
      } finally {
        isMounted && setLoading(false);
      }
    })();
    return () => { isMounted = false; };
  }, [handleTokenExpired, router]);

  return {
    username,
    lastSession,
    loading,
    menuVisible,
    setMenuVisible,
    handleSignOut,
  };
}
