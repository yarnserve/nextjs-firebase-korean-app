import { VolumeUpIcon, TrashIcon } from '@heroicons/react/solid'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState, useEffect } from 'react'
import { SayButton } from 'react-say'
import { db, storage, auth } from '../firebase'
import { doc, deleteDoc } from 'firebase/firestore'
import { ref, deleteObject } from 'firebase/storage'
import { onAuthStateChanged } from 'firebase/auth'

export default function PhotoItem({ id, kor, eng, url, image }) {
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState(null)

  onAuthStateChanged(auth, user => {
    if (user) {
      setEmail(user.email)
    } else {
      setEmail(null)
    }
  })

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  const handleDelete = async id => {
    const imageRef = ref(storage, `photo/${image}`)
    deleteObject(imageRef)
      .then(() => {
        deleteDoc(doc(db, 'photo', id))
        setIsOpen(false)
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <div>
      <div onClick={openModal}>
        <img src={url} alt="" className="rounded-2xl aspect-square object-cover" />
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto bg-black/20 backdrop-blur-sm"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span className="inline-block h-screen align-middle" aria-hidden="true">
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md overflow-hidden text-left align-middle transition-all transform bg-gray-50 shadow-xl rounded-3xl">
                <div>
                  <img src={url} alt="" className="aspect-square object-cover" />
                </div>
                <div className="p-6 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <VolumeUpIcon className="w-6 h-6 text-blue-500" />
                    <SayButton rate={0.5} text={kor}>
                      <span className="text-blue-500 text-2xl font-bold ">{kor}</span>
                    </SayButton>
                  </div>
                  <div className="text-sm text-gray-500 flex items-center gap-3">
                    <span>{eng}</span>
                    {email === process.env.NEXT_PUBLIC_EMAIL && (
                      <TrashIcon className="w-6 h-6 text-red-500" onClick={() => handleDelete(id)} />
                    )}
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  )
}
