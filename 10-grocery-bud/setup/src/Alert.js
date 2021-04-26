import React, { useEffect } from 'react'

const Alert = ({msg, type, removeAlert, list}) => {
  useEffect(()=>{
    const timeOut = setTimeout(()=>{
      removeAlert() // call default one (show = false, msg = '', type = '')
    }, 3000)
    return ()=>{
      clearTimeout(timeOut)
    },[list]})

  return (
    <p className={`alert alert-${type}`}>{msg}</p>
  )
}

export default Alert
