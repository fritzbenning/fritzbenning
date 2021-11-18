import React from 'react'
import './Spacer.scss'

interface SpacerProps {
  size: number
}

const Spacer: React.FC<SpacerProps> = ({ size }) => {
  return (
    <div
      className="spacer"
      style={{ width: `${size * 8} px`, height: `${size * 8} px` }}
    />
  )
}

export default Spacer
