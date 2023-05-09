import { useRouter } from 'next/router'
import Router from 'next/router'
import React, { useEffect } from 'react'
import Cookies from "js-cookie";

interface AuthProps {}

const Auth: React.FC<AuthProps> = () => {
  const router = useRouter()
  const token = router.query.access_token?.toString()

  useEffect(() => {
    if (token) {
      Cookies.set('bearerToken', token, { expires: 1 })
      Router.push("/")
    }
  }, [token])
  
  return (
    <div className='auth_container'>
      <h1>Loading...</h1>
    </div>
  )
}

export default Auth
