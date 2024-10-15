import React from 'react'
import { Link } from 'react-router-dom'
export default function Landingpage() {
  return (
    <div>
      <h1>Landing Page</h1>
      <Link to='/login'>Sign in</Link>
    </div>
  )
}
