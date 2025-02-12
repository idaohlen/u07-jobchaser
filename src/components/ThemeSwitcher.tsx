'use client';

import { useTheme } from 'next-themes';
import { Switch } from '@heroui/react';
import { Icon } from '@iconify/react';

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const handleToggle = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <Switch
      size='lg'
      thumbIcon={({ className }) =>
        theme === 'light'
          ? <Icon icon='solar:sun-bold' className={className} />
          : <Icon icon='solar:moon-bold' className={className} />
      }
      isSelected={theme === 'dark'}
      onChange={handleToggle}
    />
  );
}