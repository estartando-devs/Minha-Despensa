import React from 'react';
import './Button.scss'

export default function Button(props) {
  const {value, onClick} = props

  return (
  <button className="button-empty" onClick={onClick}>{value}</button>
  )
}