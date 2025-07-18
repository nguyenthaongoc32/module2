import React from 'react'
import Header from '../Header/Header'
import Delete from '../AddToDo/Delete'

const Completed = ({todos , deleteAllCompleted}) => {
  const completedTodos = todos.filter(todo => todo.completed)
  return (
    <div>
      <ul>
        {completedTodos.map((todo, index) => (
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
      <Delete deleteAllCompleted={deleteAllCompleted} />
    </div>
  )
}

export default Completed
