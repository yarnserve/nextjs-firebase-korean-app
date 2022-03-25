import { useTheme } from 'next-themes'
import Link from 'next/link'
import { SunIcon, MoonIcon, UserRemoveIcon } from '@heroicons/react/solid'
import { useEffect, useState } from 'react'
import { auth } from '../firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import Nav from './Nav'
import WritePhoto from './WrtiePhoto'
import WriteEssential from './WriteEssential'
// import WriteSentence from './WriteSentence'

export default function Top() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [email, setEmail] = useState(null)

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        setEmail(user.email)
      } else {
        setEmail(null)
      }
    })
  }, [email])

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const handleLogout = () => {
    signOut(auth).then(() => {
      setEmail(null)
    })
  }

  return (
    <div className="flex items-center py-4">
      <Nav />
      <Link href="/">
        <div className="flex items-center gap-1 cursor-pointer">
          <span className="text-sm">learning</span>
          <span className="text-xl font-bold ">Korean</span>
        </div>
      </Link>

      <div className="flex items-center ml-auto">
        {email === process.env.NEXT_PUBLIC_EMAIL && (
          <div className="flex gap-2 mr-2">
            <WritePhoto />
            <WriteEssential />
            {/* <WriteSentence /> */}
            <UserRemoveIcon className="w-6 h-6 text-red-500 cursor-pointer" onClick={handleLogout} />
          </div>
        )}

        <span onClick={toggleTheme}>
          {theme === 'dark' ? <SunIcon className="w-6 h-6" /> : <MoonIcon className="w-6 h-6" />}
        </span>
      </div>
    </div>
  )
}
