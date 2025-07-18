import React, { useState } from 'react'
import '../AddToDo/input.css'
const AddInput = ({addToDo}) => {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputValue.trim() !== '') {
            addToDo(inputValue);
            setInputValue('');
        }
    };
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className='page-inp-container'>
                    <input className='page-input' type='text' placeholder='add details' value={inputValue} onChange={handleInputChange} />
                    <button type='submit' className='page-addbtn'>Add</button>
                </div>
            </form>
        </>
    )
}

export default AddInput
