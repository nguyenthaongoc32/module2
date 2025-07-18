import { useState } from 'react'

import Header from './component/Header/Header'
import { Route, Routes } from 'react-router-dom';
import All from './component/All/All';
import Active from './component/Active/Active';
import Completed from './component/Completed/Completed';
import AddInput from './component/AddToDo/AddInput';
import Nav from './component/Header/Nav';

function App() {
  const [todos, setTodos] = useState([]);
  const addToDo = (todo) => {
    setTodos([...todos, { text: todo, completed: false }]);
  };

  const toggleTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const deleteAllCompleted = () => {
    const newTodos = todos.filter(todo => !todo.completed);
    setTodos(newTodos);
  };

  return (
    <>
      <Header />
      <main className='page-main' style={{ margin: "3rem 0" }}>
        <Nav/>
      </main>
      <Routes>
        <Route path='/all' element={<All todos={todos} addToDo={addToDo} toggleTodo={toggleTodo} />}></Route>
        <Route path='/active' element={<Active todos={todos} addToDo={addToDo} toggleTodo={toggleTodo} />} />

        <Route path='/completed' element={<Completed todos={todos} deleteAllCompleted={deleteAllCompleted} />}></Route>
      </Routes>
    </>
  )
}

export default App
