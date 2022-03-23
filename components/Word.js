import { VolumeUpIcon, DocumentAddIcon, TrashIcon, CogIcon } from '@heroicons/react/solid'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { SayButton } from 'react-say'
import { db } from '../firebase'
import { doc, deleteDoc } from 'firebase/firestore'
import { useRecoilValue } from 'recoil'
import { loginState } from '../store'

export default function Word({ id, kor, eng, url, image, timestamp }) {
  const isLogin = useRecoilValue(loginState)
  const [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  const handleDelete = async id => {
    setIsOpen(false)
    await deleteDoc(doc(db, 'words', id))
  }

  const handleEdit = async id => {
    console.log(id)
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
              <div className="inline-block w-full max-w-md overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-3xl">
                <div>
                  <img src={url} alt="" className="aspect-square object-cover" />
                </div>
                <div className="flex items-center justify-center px-4 py-3 border-b">
                  <div className="flex items-center gap-2">
                    <VolumeUpIcon className="w-6 h-6 text-blue-500" />
                    <SayButton rate={0.5} text={kor}>
                      <span className="text-blue-500 text-3xl font-bold">{kor}</span>
                    </SayButton>
                  </div>
                </div>
                <div className="flex items-center px-4 py-3 text-gray-500">
                  <span className="mr-auto">{eng}</span>
                  <DocumentAddIcon className="w-6 h-6 " />
                  {isLogin && (
                    <div className="flex gap-3 ml-4">
                      <CogIcon className="w-6 h-6" onClick={() => handleEdit(id)} />
                      <TrashIcon className="w-6 h-6 " onClick={() => handleDelete(id)} />
                    </div>
                  )}
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  )
}
