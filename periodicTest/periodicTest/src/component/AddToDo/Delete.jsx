import React from 'react'

const Delete = ({ deleteAllCompleted}) => {
  return (
    <div className='page-delete' style={{display:"flex", justifyContent:"flex-end", margin:"1.5rem 0"}}>
        <button className='page-deletebtn'
        onClick={deleteAllCompleted}
        style={{color:"#fff", fontSize:"12px", fontWeight:"600", border:"0",borderRadius:"4px", background:"red",padding:".8rem 1.5rem", cursor:"pointer",}}>
            <span>delete all</span>
        </button>
      
    </div>
  )
}

export default Delete
