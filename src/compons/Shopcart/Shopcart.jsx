import React from 'react'
import './Shopcart.css'

export default function Shopcart() {
  return <>

<div className='con mt-5 pt-5'>
<a className="btn btn-primary " data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
Link
</a>
<div className="offcanvas offcanvas-start" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
<div className="offcanvas-header">
<h5 className="offcanvas-title" id="offcanvasExampleLabel">Offcanvas</h5>
<button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
</div>
<div className="offcanvas-body">
<div>
Some text as placeholder. In real life you can have the elements you have chosen. Like, text, images, lists, etc.
</div>
</div>
</div>
</div>
  </>

}



