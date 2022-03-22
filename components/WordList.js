import { useState, useEffect } from 'react'
import Word from './Word'
import { db } from '../firebase'
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore'
import WriteBtn from './WriteBtn'
import { useRecoilValue } from 'recoil'
import { loginState } from '../store'

export default function WordList() {
  const isLogin = useRecoilValue(loginState)
  const [words, setWords] = useState([])

  useEffect(() => {
    const q = query(collection(db, 'words'), orderBy('timestamp', 'desc'))
    onSnapshot(q, snapshot => {
      setWords(
        snapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id
        }))
      )
    })
  }, [])

  console.log(words)

  return (
    <div>
      <div>{isLogin && <WriteBtn />}</div>
      <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 2xl:grid-cols-9 gap-5 p-5">
        {words.map(word => (
          <Word
            key={word.id}
            id={word.id}
            kor={word.kor}
            eng={word.eng}
            url={word.url}
            image={word.image}
            timestamp={word.timestamp}
          />
        ))}
      </div>
    </div>
  )
}
