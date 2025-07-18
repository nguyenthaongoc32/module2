import React from 'react'
import Header from '../Header/Header'
import AddInput from '../AddToDo/AddInput'

const Active = ({todos, toggleTodo, addToDo}) => {
  return (
    <div>
      <AddInput addToDo={addToDo}/>
      <ul>
        {todos.filter(todo =>!todo.completed).map((todo,index) =>(
            <li key={index} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(index)} 
            />
                {todo.text}
            </li>
        ))}
      </ul>
    </div>
  )
}

export default Active
