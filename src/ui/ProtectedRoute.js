import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function ProtectedRoute({ componant }) {

  const navigate = useNavigate()
  useEffect(() => {
    let data = localStorage.getItem("token")


    if (!data) {
      toast("You need to Register")
      navigate("/unauthorized")
    }
  },[navigate])
  return (
    <div className='w-100'>
      {componant}
    </div>
  )
}