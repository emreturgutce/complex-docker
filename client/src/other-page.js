import React from 'react'
import { Link } from 'react-router-dom'

export function OtherPage() {
  return (
    <div>
      I'm some other page!
      <Link to='/'>Go Back Home</Link>
    </div>
  )
}
