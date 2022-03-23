import React from 'react'
import PhotoList from '../components/PhotoList'
import Top from '../components/Top'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Top />
      <PhotoList />
    </div>
  )
}
