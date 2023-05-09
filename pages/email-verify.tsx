import { useAppDispatch } from '@/redux/features/hooks'
// import { verifyEmailThunk } from '@/redux/slices/verifyEmailSlice'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

function VerifyEmail() {

    type TokenProps = any

  const dispatch = useAppDispatch()
  const router = useRouter()
  const token:TokenProps = router.query.token
  
  
  // useEffect(() => {
  //   router?.query?.token && dispatch(verifyEmailThunk(token));
  //   router.push("/");
  // }, [router.query])

  return (
    <div className='verify_email'>
      <div className='verify_email_container'>
        <form className='verify_email_form'>
          <label>Verification Completed!</label>
        </form> 
      </div>
    </div>
  )
}

export default VerifyEmail
