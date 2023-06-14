import React, { useContext, useEffect, useState } from 'react'
import  './Products.css'
import axios from 'axios'
import { Link } from 'react-router-dom';
import { cartContext } from '../Context/Context';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer ,toast } from 'react-toastify';

export default function Products() {
  let {Addcart} = useContext(cartContext);

async function proadd(proid){
  let res = await Addcart(proid)
  console.log(res)
  if(res.data.status === 'success'){
    toast.success("product  in cart ")
  }else{
    toast.error("error in api")
  }
}
  let [price,setPrice] = useState('')
  let [name,setName] = useState('')
  let [Product,setProduct] = useState([])
  async function getpro(){
  let {data} = await axios.get(`https://route-ecommerce.onrender.com/api/v1/products`);
  setProduct(data.data)
  }
  useEffect(()=>{
    getpro()
  },[])
  return <>
  <header className='bg-dark'>
    <div className="container product">
    <form className='proudctform d-flex'>
      <div className="priceform w-25">
        <input className='w-100' type='number' onChange={(e)=>setPrice(e.target.value)} placeholder='search by price' />
      </div>
      <div className="searchform ps-4 w-75">
        <input className='w-100' type='text' onChange={(e)=>setName(e.target.value)} placeholder='search by first letter' />
      </div>
    </form>
      <div className="row px-lg-5">
        {Product.filter((pro)=>price === "" && name === "" ? pro : pro.price <= price || name === pro.title[0] ).map((pro)=> <div key={pro.id} className='col col-lg-3 col-md-4 col-sm-6 col-10 p-2 m-auto'>
          <div className="boxs">
          <Link to={`/products/${pro.id}`}>
            <div className="box py-3 w-100 text-center text-white">
              <h6 className='mb-3'>{pro.title.split(" ",2).join(" ")}</h6>
              <img className='w-100' height={'250px'} src={pro.imageCover} alt=''/>
            </div>
          </Link>
          <div className="box px-2  pb-3 w-100 d-flex align-items-center justify-content-between">
            <button className='btn btn-danger' onClick={()=> proadd(pro._id)}>Add cart</button>
            <ToastContainer />
            <span className='text-danger fw-bold'>{pro.price} EGP</span>
          </div>
          </div>
        </div>)}
      </div>
    </div>
  </header>
  </>
}
