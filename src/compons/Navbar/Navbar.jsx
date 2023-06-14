import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { cartContext } from '../Context/Context'
import './Navbar.css'


export default function Navbar() {
  let {localdata} = useContext(cartContext);
  console.log(localdata)
  function removelocal(){
    localStorage.clear()
  }
  return <>
  <nav className="navbar navbar-expand-sm bg-light">
      <div className="container">
      <Link className="navbar-brand" to="Home">
          <img src={'https://seeklogo.com/images/E/El_Palacio_de_Hierro-logo-B3A9ED6960-seeklogo.com.png'} style={{height:'50px',width:'200px'}} alt=""/>
      </Link>
      <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId"
        aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse justify-content-end" id="collapsibleNavId">
        {localdata != null ? 
        <>
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <Link className="nav-link active" to="Home">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link active" to="Cart">cart</Link>
          </li>
        </ul>
        <ul className="navbar-nav icons me-0">
          <Link to="Login"><button className='btn btn-dark ms-3' onClick={removelocal}>logout</button></Link>
        </ul>
        </>
        : null}
        {localdata === null ?         
          <ul className="navbar-nav me-0">
            <li className="nav-item">
              <Link className="nav-link active" to="Login">Login</Link>
            </li>
          </ul>: null}
      </div>
    </div>
  </nav>
  
  </>
}
