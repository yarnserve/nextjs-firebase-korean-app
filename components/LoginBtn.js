import { auth } from '../firebase'
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth'
import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { loginState } from '../store'
import { UserCircleIcon } from '@heroicons/react/solid'

export default function LoginBtn() {
  const [isLogin, setIsLogin] = useRecoilState(loginState)
  const provider = new GoogleAuthProvider()

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        setIsLogin({
          photo: user.photoURL,
          email: user.email
        })
      } else {
        setIsLogin(null)
      }
    })
  }, [])

  const handleLogin = () => {
    signInWithPopup(auth, provider)
  }

  const handleLogout = () => {
    signOut(auth)
  }

  return (
    <div>
      {isLogin ? (
        <div className="flex items-center gap-3">
          <button onClick={handleLogout} className="text-sm">
            logout
          </button>
          <img src={isLogin.photo} alt="user-photo" className="w-8 h-8 rounded-full" />
        </div>
      ) : (
        <UserCircleIcon className="w-8 h-8 text-gray-300" onClick={handleLogin} />
      )}
    </div>
  )
}
