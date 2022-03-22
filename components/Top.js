import { useEffect } from 'react'
import LoginBtn from './LoginBtn'
import { useTheme } from 'next-themes'

export default function Top() {
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setTheme('dark')
  }, [])

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <div className="flex items-center justify-between px-4 py-4">
      <h1 className="text-3xl font-bold ">ㄱㄴ</h1>
      <button onClick={toggleTheme}>mode</button>
      <LoginBtn />
    </div>
  )
}
