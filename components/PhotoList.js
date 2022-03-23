import { useState, useEffect } from 'react'
import { db, auth } from '../firebase'
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore'
import Photo from './Photo'
import PhotoWrite from './PhotoWrite'
import { onAuthStateChanged, signOut } from 'firebase/auth'

export default function PhotoList() {
  const [photos, setPhotos] = useState([])
  const [email, setEmail] = useState(null)

  onAuthStateChanged(
    auth,
    user => {
      if (user) {
        setEmail(user.email)
      } else {
        setEmail(null)
      }
    },
    [email]
  )

  useEffect(() => {
    const q = query(collection(db, 'photos'), orderBy('timestamp', 'desc'))
    onSnapshot(q, snapshot => {
      setPhotos(
        snapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id
        }))
      )
    })
  }, [])

  const handleLogout = () => {
    signOut(auth)
  }

  return (
    <div>
      {email === process.env.NEXT_PUBLIC_EMAIL && (
        <div>
          <PhotoWrite />
          <button onClick={handleLogout}>logout</button>
        </div>
      )}
      <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 2xl:grid-cols-9 gap-5 p-5">
        {photos.map(photo => (
          <Photo
            key={photo.id}
            id={photo.id}
            kor={photo.kor}
            eng={photo.eng}
            url={photo.url}
            image={photo.image}
            timestamp={photo.timestamp}
          />
        ))}
      </div>
    </div>
  )
}
