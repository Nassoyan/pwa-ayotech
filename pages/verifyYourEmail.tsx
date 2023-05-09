import { emailSelector } from '@/redux/slices/authentication/registerSlice'
import Link from 'next/link'
import React from 'react'
import { useSelector } from 'react-redux'

function VerifyYourEmail() {
  
  
  return (
    <div className='verify_email'>
    <div className='verify_email_container'>
      <form className='verify_email_form'>
        <label>We sent an email to <Link href="https://mail.google.com/mail/u/0/">nasoyantigo@gmail.com</Link></label>
      </form>
    </div>
  </div>
  )
}

export default VerifyYourEmail
