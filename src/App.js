import React from 'react';
import { RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom'
import Layout from './compons/Layout/Layout';
import Login from './compons/Login/Login';
import Register from './compons/Register/Register';
import Home from './compons/Home/Home';
import ProductDetlis from './compons/ProductDetlis/ProductDetlis';
import ContextApp from './compons/Context/Context';
import Prorouter from './compons/Prorouter/Prorouter';
import Cart from './compons/Cart/Cart';
import Shopcart from './compons/Shopcart/Shopcart';
  

export default function App() {

  let router = createHashRouter([
    {path:'',element:<Layout/>,children:[
      {index:true,element:<Login/>},
      {path:'Login',element:<Login/>},
      {path:'Register',element:<Register/>},
      {path:'Home',element:<Prorouter><Home/></Prorouter>},
      {path:'Cart',element:<Prorouter><Cart/></Prorouter>},
      {path:'Shopcart',element:<Prorouter><Shopcart/></Prorouter>},
      {path:'Products/:id',element:<Prorouter><ProductDetlis/></Prorouter>},
    ]}
  ])


  return <>
  <ContextApp>
  <RouterProvider router={router}></RouterProvider>
  </ContextApp>
  </>


}
