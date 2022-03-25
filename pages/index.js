import React from 'react'
import { PhotographIcon } from '@heroicons/react/solid'
import PhotoList from '../components/PhotoList'

export default function Home() {
  return (
    <div>
      <div className="flex items-center pb-4">
        <PhotographIcon className="w-4 h-4 text-blue-500 mr-2" />
        <h2 className="text-sm">Photo words</h2>
      </div>
      <PhotoList />
    </div>
  )
}
