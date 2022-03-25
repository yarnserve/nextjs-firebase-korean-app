import { VolumeUpIcon, TrashIcon } from '@heroicons/react/solid'
import { useState, useEffect } from 'react'
import { SayButton } from 'react-say'
import { db, storage, auth } from '../firebase'
import { doc, deleteDoc } from 'firebase/firestore'
import { ref, deleteObject } from 'firebase/storage'
import { onAuthStateChanged } from 'firebase/auth'

export default function PhotoItem({ id, kor, eng, url, image }) {
  const [email, setEmail] = useState(null)

  onAuthStateChanged(auth, user => {
    if (user) {
      setEmail(user.email)
    } else {
      setEmail(null)
    }
  })

  const handleDelete = async id => {
    const imageRef = ref(storage, `essential/${image}`)
    deleteObject(imageRef)
      .then(() => {
        deleteDoc(doc(db, 'essential', id))
        setIsOpen(false)
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <div className="flex items-center max-w-xl bg-gray-50 dark:bg-gray-800 shadow-lg rounded-md overflow-hidden">
      <div className="w-24">
        <img src={url} alt="" className="aspect-square object-cover" />
      </div>
      <div className="flex items-center w-full px-3">
        <div>
          <div className="flex items-center gap-2">
            <VolumeUpIcon className="w-5 h-5 text-blue-500" />
            <SayButton rate={0.5} text={kor}>
              <span className="text-blue-500 text-1xl font-bold ">{kor}</span>
            </SayButton>
          </div>
          <p className="text-gray-400 text-sm">{eng}</p>
        </div>
        {email === process.env.NEXT_PUBLIC_EMAIL && (
          <TrashIcon className="w-5 h-5 text-red-500 ml-auto" onClick={() => handleDelete(id)} />
        )}
      </div>
    </div>
  )
}
