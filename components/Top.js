import { useTheme } from 'next-themes'
import Link from 'next/link'
import { SunIcon, MoonIcon } from '@heroicons/react/solid'
import { useEffect, useState } from 'react'

export default function Top() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <div className="flex justify-between px-4 py-4 items-end">
      <Link href="/">
        <div className="flex items-center gap-1">
          <p className="text-sm">learning</p>
          <div className="text-xl font-bold ">Korean</div>
        </div>
      </Link>

      <div onClick={toggleTheme}>
        {theme === 'dark' ? <SunIcon className="w-7 h-7" /> : <MoonIcon className="w-7 h-7" />}
      </div>

      {/* <LoginBtn /> */}
    </div>
  )
}
