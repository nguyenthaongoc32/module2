import React from 'react';
import './nav.css'
import { Link,useLocation } from 'react-router-dom';
const Nav = () => {
    const location = useLocation();
  return (
    <div className='page-menu'>
        <div className='page-menu-app'>
            
                <Link className={`page-link ${location.pathname === '/all' ? 'pln' : ''}`}
                  to='/all'
                 >
                    <span className={`title-app ${location.pathname === '/all' ? 'pln' : ''}`}
                  to='/all'
                  >All
                </span>
                </Link>
            <div className='page-underline'></div>
        </div>
        <div className='page-menu-app'>
        <Link className={`page-link ${location.pathname === '/active' ? 'pln' : ''}`}
                  to='/active'
                  >
                    <span className={`title-app ${location.pathname === '/active' ? 'pln' : ''}`}
                  to='/active'
                 >Active
                </span>
                </Link>
            <div className='page-underline'></div>
        </div>
        <div className='page-menu-app'>
        <Link className={`page-link ${location.pathname === '/completed' ? 'pln' : ''}`}
                  to='/completed'
                 >
                    <span className={`title-app ${location.pathname === '/completed' ? 'pln' : ''}`}
                  to='/completed'
                 >Completed
                </span>
                </Link>
            <div className='page-underline'></div>
        </div>
        <hr className='page-hr' style={{margin:"0", border:"0",borderTop:"1px soild #dbdbdb"}}></hr>
    </div>
  )
}

export default Nav
