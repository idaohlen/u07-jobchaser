'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

import { Switch } from '@heroui/react'
import { Icon } from '@iconify/react'

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if(!mounted) return null

  const handleToggle = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <Switch
      defaultSelected
      size="lg"
      thumbIcon={({isSelected, className}) =>
        isSelected
      ? <Icon icon='solar:sun-bold' className={className}/>
      : <Icon icon='solar:moon-bold' className={className}/>
      }
      checked={theme === 'dark'}
      onChange={handleToggle}
    >
    </Switch>
  )
};