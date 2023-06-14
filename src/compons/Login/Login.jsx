import React, { useContext, useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import Particals from '../Particals/Particles'
import { cartContext } from '../Context/Context'
import './Login.css'
export default function Login() {

  let {Getlocal} = useContext(cartContext)
  let [msg,setmsg] = useState(null)
  let nav = useNavigate()
  async function handle(values){
    let {data} = await axios.post('https://route-ecommerce.onrender.com/api/v1/auth/signin',values).catch((errr)=>{
      setmsg(`this email not registed`)
    });
    if(data.message === 'success'){
      localStorage.setItem('userToken', data.token)
      Getlocal()
      nav('/Home')
    }
  }
  let validation = yup.object({
    email:yup.string().required('email is required').email('email is invalid'),
    password:yup.string().required('passowrd is required').matches(/^[a-z0-9]{5,10}$/,'password must be minlength is 5 and maxlength is 10'),
  })
  let formik = useFormik({
    initialValues:{
      email:"",
      password:"",
    },
    validationSchema:validation,
    onSubmit:handle,
  })

  return <>
<header >
    <div className="container enter align-items-center d-flex justify-content-center">
      <form onSubmit={formik.handleSubmit} className='w-100'>
        <div className="row justify-content-center">
          <div className="col col-8">
            <div className="inp  mb-2">
              <label className='mb-1 text-white' htmlFor="email">email</label>
              <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type='email' placeholder='enter your email' id='email' name='email'/>
              {formik.errors.email && formik.touched.email ? <div className='alert alert-danger'>{formik.errors.email}</div>: null}
              {msg ? <div className='alert alert-danger'>{msg}</div>: null}
            </div>
          </div>
          <div className="col col-8">
            <div className="inp  mb-2">
              <label className='mb-1 text-white' htmlFor="password">password</label>
              <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} type='password' placeholder='enter your password' id='password' name='password'/>
              {formik.errors.password && formik.touched.password ? <div className='alert alert-danger'>{formik.errors.password}</div>: null}
            </div>
          </div>
          <div className="col col-8 d-flex mt-2 justify-content-between">
            <button className='btn btn-primary' type='supmit'>submit</button>
            <p><Link to={'/Register'}>register now</Link></p>
          </div>
        </div>
      </form>
      
    </div>
  </header>
  <Particals/>
  </>
}
