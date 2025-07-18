import React from 'react'
import Nav from './Nav'

const Header = () => {
    return (
        <div>
            <div className='page-header' style={{ display: "flex", justifyContent: "center" }}>
                <h1 className='page-title'
                    style={{
                        fontSize: "36px",
                        fontWeight: "700",
                    }}>#todo</h1>
            </div>
            
            
        </div>
    )
}

export default Header
