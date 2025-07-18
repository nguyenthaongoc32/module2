import React from 'react'
import All from './component/All/All'
import Active from './component/Active/Active'
import Completed from './component/Completed/Completed'

const ToDo = () => {
  return (
    <div>
      <All/>
      <Active/>
      <Completed/>
    </div>
  )
}

export default ToDo
