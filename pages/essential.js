import React from 'react'
import { DocumentTextIcon } from '@heroicons/react/solid'
import EssentialList from '../components/EssentialList'

export default function Essential() {
  return (
    <div>
      <div className="flex items-center pb-4">
        <DocumentTextIcon className="w-4 h-4 text-blue-500 mr-2" />
        <h2 className="text-sm">200 essential words</h2>
      </div>
      <EssentialList />
    </div>
  )
}
