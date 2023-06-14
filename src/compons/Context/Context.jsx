import React, { createContext, useState } from 'react'
// import './Context.css'
import jwtDecode from 'jwt-decode'
import axios from 'axios'

export let cartContext = createContext()

export default function ContextApp(props) {
  let headers ={
    token : localStorage.getItem('userToken')
  }
  let [localdata,setlocaldata] = useState(null)
  function Getlocal(){
    let tokendata = localStorage.getItem('userToken');
    let smash = jwtDecode(tokendata)
    setlocaldata(smash)
  }

  function Addcart(productId){
    return axios.post(`https://route-ecommerce.onrender.com/api/v1/cart`,{
      productId:productId
    },{
      headers:headers
    }).then((resbonse)=> resbonse)
    .catch((error)=>error)
  }
  async function Getcart(){
    return axios.get(`https://route-ecommerce.onrender.com/api/v1/cart`,{
      headers:headers
    }).then((resbonse)=> resbonse)
    .catch((error)=>error)
  }
  async function removecart(productId){
    return axios.delete(`https://route-ecommerce.onrender.com/api/v1/cart/${productId}`,{
      headers:headers
    }).then((resbonse)=> resbonse)
    .catch((error)=>error)
  }
  async function updatecart(productId,count){
    return axios.put(`https://route-ecommerce.onrender.com/api/v1/cart/${productId}`,{
      count:count
    },{
      headers:headers
    }).then((resbonse)=> resbonse)
    .catch((error)=>error)
  }
  return <cartContext.Provider value={{localdata,Getlocal,Addcart,Getcart,removecart,updatecart}}>
  {props.children}
</cartContext.Provider>
}
