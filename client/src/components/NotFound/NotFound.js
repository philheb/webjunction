import React from 'react'
import sadFace from '../../assets/images/sad-computer.svg'

export default function NotFound() {
  return (
    <div>
      <h1 className="display-4">Page Not Found</h1>
      <p>Sorry, this page does not exist</p>
      <img src={sadFace} style={{ width: '200px' }} alt="sad-face" />
    </div>
  )
}
