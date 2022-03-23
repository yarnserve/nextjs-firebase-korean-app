import { useState } from 'react'
import Top from '../components/Top'
import { auth } from '../firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'next/router'

export default function Login() {
  const [user, setUser] = useState({ email: '', password: '' })

  const router = useRouter()

  const handleSubmit = async e => {
    e.preventDefault()
    await signInWithEmailAndPassword(auth, user.email, user.password)
    router.push('/')
  }

  return (
    <div>
      <Top />
      <div className="max-w-md p-6 m-auto">
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="email"
            value={user.email}
            onChange={e => setUser({ ...user, email: e.target.value })}
            className="w-full p-2 border"
          />
          <input
            type="password"
            placeholder="password"
            value={user.password}
            onChange={e => setUser({ ...user, password: e.target.value })}
            className="w-full p-2 border"
          />
          <button type="submit" className="flex m-auto px-4 py-2 font-bold bg-blue-500 text-white mt-3">
            Login
          </button>
        </form>
      </div>
    </div>
  )
}
