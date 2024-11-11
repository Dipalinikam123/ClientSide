import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
export default function Unauthorized({logModal,regModal}) {
  const [token, setToken] = useState('')
  const navigate = useNavigate()
  useEffect(() => {
    let token = localStorage.getItem("token")
    setToken(token)
  }, [logModal,regModal])
  return (
    <div>
      {
        token ? navigate('/') : <h1>Unauthorized</h1>
      }

    </div>
  )
}
