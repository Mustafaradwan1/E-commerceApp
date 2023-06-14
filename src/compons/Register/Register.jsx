import React, { useState } from 'react'
import   './Register.css'
import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Particals from '../Particals/Particles'

export default function Register() {
  let [msg,setmsg] = useState(null)
  let nav = useNavigate()
  async function handle(values){
    let {data} = await axios.post('https://route-ecommerce.onrender.com/api/v1/auth/signup',values).catch((error)=>{
      setmsg(`this email alredy register`)
    })
    if(data.message === 'success'){
      nav('/Login')
    }
  }


  let validation = yup.object({
    name:yup.string().required('name is required').min(3,'min length is 3').max(10,'max length is 10'),
    email:yup.string().required('email is required').email('email is invalid'),
    phone:yup.string().required('phone is required').matches(/^01[0125][0-9]{8}$/,'phone start with 01(0,1,2,5) and max length is 11'),
    password:yup.string().required('passowrd is required').matches(/^[a-z0-9]{5,10}$/,'password must be minlength is 5 and maxlength is 10'),
    rePassword:yup.string().required('rePassword is required').oneOf([yup.ref('password')] ,'password and rePasword dosent match'),
  })

  let formik = useFormik({
    initialValues:{
      name:'',
      email:"",
      phone:"",
      password:"",
      rePassword:"",
    },
    validationSchema:validation,
    onSubmit:handle,
  })

  return <>
    <header >
    <div className="container enter align-items-center d-flex justify-content-center">
      <form onSubmit={formik.handleSubmit}>
        <div className="row justify-content-center">
          <div className="col col-8">
            <div className="inp  mb-2">
              <label className='mb-1 text-white' htmlFor="name">name</label>
              <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} type='text' placeholder='enter your name' id='name' name='name'/>
              {formik.errors.name && formik.touched.name ? <div className='alert alert-danger'>{formik.errors.name}</div>: null}
            </div>
          </div>
          <div className="col col-8">
            <div className="inp  mb-2">
              <label className='mb-1 text-white' htmlFor="email">email</label>
              <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type='email' placeholder='enter your email' id='email' name='email'/>
              {formik.errors.email && formik.touched.email ? <div className='alert alert-danger'>{formik.errors.email}</div>: null}
              {msg ? <div className='alert alert-danger'>{msg}</div> : null}
            </div>
          </div>
          <div className="col col-8">
            <div className="inp  mb-2">
              <label className='mb-1 text-white' htmlFor="phone">phone</label>
              <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} type='tell' placeholder='enter your phone' id='phone' name='phone'/>
              {formik.errors.phone && formik.touched.phone ? <div className='alert alert-danger'>{formik.errors.phone}</div>: null}
            </div>
          </div>
          <div className="col col-8">
            <div className="inp  mb-2">
              <label className='mb-1 text-white' htmlFor="password">password</label>
              <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} type='password' placeholder='enter your password' id='password' name='password'/>
              {formik.errors.password && formik.touched.password ? <div className='alert alert-danger'>{formik.errors.password}</div>: null}
            </div>
          </div>
          <div className="col col-8">
            <div className="inp  mb-2">
              <label className='mb-1 text-white' htmlFor="rePassword">rePassword</label>
              <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.rePassword} type='password' placeholder='enter your rePassword' id='rePassword' name='rePassword'/>
              {formik.errors.rePassword && formik.touched.rePassword ? <div className='alert alert-danger'>{formik.errors.rePassword}</div>: null}
            </div>
          </div>
          <div className="col col-8">
            <button className='btn btn-primary' type='supmit'>submit</button>
          </div>
        </div>
      </form>
    </div>
  </header>
  <Particals/>
  </>
}
