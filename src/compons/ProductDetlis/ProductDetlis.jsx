import React, { useContext, useEffect, useState } from 'react'
import  './ProductDetlis.css'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { cartContext } from '../Context/Context';
// import { toast } from 'react-hot-toast';
import Slider from "react-slick";
export default function ProductDetlis() {
  let {addcart} = useContext(cartContext);
  async function cartadd(proid){
    let res = await addcart(proid)
  }
  let {id} = useParams()
  let [prodata,setprodata] = useState(null)
  async function getdata(){
    let {data} = await axios.get(`https://route-ecommerce.onrender.com/api/v1/products/${id}`)
    setprodata(data.data)
  }
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true,
    autoplaySpeed:3000,
  };
  useEffect(()=>{
    getdata()
  })
  return <>
  <header className='pt-5 bg-dark'>
    <div className="container ">

      <div className="row">
        <div className="col col-md-4 col-10 m-auto px-5">
        <Slider className="slider" {...settings}>
          {prodata?.images.map((img)=> 
            <img key={Math.random()} className='w-100 mb-3' src={img} alt=''/>
            )}
            </Slider>
        </div>
        <div className="col col-md-8">
          <h2 className='text-white'>title : <span className='fs-5 text-muted'>{prodata?.title} </span></h2>
          <h2 className='text-white'>brand : <span className='fs-5 text-muted'>{prodata?.brand.name} </span></h2>
          <h2 className='text-white'>description :  <span className='fs-5 text-muted'>{prodata?.description}</span> </h2>
          <h2 className='text-white'>price : <span className='fs-5 text-muted'>${prodata?.price}</span></h2>
          <h2 className='text-white'>ratingsAverage : <span className='fs-5 text-muted'> {prodata?.ratingsAverage}</span></h2>
          <h2 className='text-white'>createdAt : <span className='fs-5 text-muted'>{prodata?.createdAt}</span></h2>
          <button className='btn btn-danger mt-3' onClick={()=> cartadd(prodata._id)}>Add cart</button>
        </div>
      </div>
    </div>
  </header>
  </>
}
