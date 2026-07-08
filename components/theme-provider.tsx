'use client';

import { useEffect, useSyncExternalStore } from 'react';

const THEME_STORAGE_KEY = 'theme';

function readThemePreference() {
  if (typeof window === 'undefined') {
    return false;
  }

  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);

  if (storedTheme) {
    return storedTheme === 'dark';
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function subscribeThemeChanges(onStoreChange: () => void) {
  if (typeof window === 'undefined') {
    return () => {};
  }

  const handleStorage = () => onStoreChange();
  const handleThemeChange = () => onStoreChange();

  window.addEventListener('storage', handleStorage);
  window.addEventListener('themechange', handleThemeChange);

  return () => {
    window.removeEventListener('storage', handleStorage);
    window.removeEventListener('themechange', handleThemeChange);
  };
}

function useThemePreference() {
  return useSyncExternalStore(subscribeThemeChanges, readThemePreference, () => false);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const isDark = useThemePreference();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  return <>{children}</>;
}

export function useTheme() {
  const isDark = useThemePreference();

  const toggleTheme = () => {
    const nextIsDark = !isDark;
    window.localStorage.setItem(THEME_STORAGE_KEY, nextIsDark ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', nextIsDark);
    window.dispatchEvent(new Event('themechange'));
  };

  return { isDark, toggleTheme };
}
