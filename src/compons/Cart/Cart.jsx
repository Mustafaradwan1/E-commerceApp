import React, { useContext, useEffect, useState } from 'react'
import { cartContext } from '../Context/Context';
import { toast } from 'react-hot-toast';


export default function Cart() {
  let {Getcart,removecart,updatecart} = useContext(cartContext);
  let [cartdata,setcartdata] = useState(null)
  async function Thecard(){
    let res = await Getcart();
    setcartdata(res.data.data)
  }
  
console.log(cartdata)
  async function removedata(proid){
    let res = await removecart(proid);
    setcartdata(res.data.data)
    toast('product is removed')
  }
  async function updatedata(proid,count){
    let res = await updatecart(proid,count);
    setcartdata(res.data.data)
  }
  useEffect(()=>{
    Thecard()
  },[])
  return <>
  <header className='headercart bg-dark'>
    <div className="container pt-4">
      <div className="boxs py-5">
      {cartdata === null ? <div className='mt-5 ms-3'> <h2 className='text-white'>no data to show</h2></div> : 
    <>
    <h2 className='mt-3 text-white'>total : <span className='fs-2 text-danger'>${cartdata?.totalCartPrice}</span></h2>
    {cartdata?.products.map((pro)=> <div key={pro.product._id} className='row my-2 pt-3'>
      <div className="col col-3 colcart">
          <img className='w-100' src={pro.product.imageCover} height={'100%'} alt="" />
      </div>
      <div className="col col-9 text-white">
        <h3>name brand : <span className="fs-5 text-muted">{pro.product.brand.name}</span></h3>
        <h3>title : <span className="fs-5 text-muted">{pro.product.title}</span></h3>
        <h3>price : <span className='text-muted'>${pro.price}</span></h3>
        <h3 className='h3'>count :  
          <button className='count fw-bold ms-2' onClick={()=>updatedata(pro.product._id, pro.count+1)}>+</button>
          <span className='mx-3'>{pro.count}</span>
          {pro.count === 0 ? <button className='count fw-bold' disabled onClick={()=>updatedata(pro.product._id, pro.count-1)}>-</button> : <button className='count fw-bold' onClick={()=>updatedata(pro.product._id, pro.count-1)}>-</button>}
        </h3>
        <button className='fw-bold btn btn-danger mt-3' onClick={()=>removedata(pro.product._id)}>Remove</button>
      </div>
    </div>)}
    </>
    }
      </div>
    </div>
  </header>
  </>
}
