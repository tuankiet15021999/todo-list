import React, { useState } from 'react'
const CreateTodoModal = (
    {
        content,
        onCancel = () => {},
        onSubmit = () => {},
        isEdit = false
    }
    ) => {
    const [value, setValue] = useState(content)
    const handleOnChange = (event) => {
        setValue(event.target.value)
    }
    const handleOnSubmit = (event) => {
        event.preventDefault()
        onSubmit(value)
    }


    return (
    <>
        <div className='modal'>
            <div className="modal-container">
                <form onSubmit={handleOnSubmit} >
                    <div>
                        <h2 className="float-left">{isEdit ? 'Edit' : 'Create'}</h2>
                        <span onClick={onCancel} className="close-modal float-right">&times;</span>
                    </div>
                    <div className="clear padding-10">
                    <label htmlFor="todoTitle" className="display-b">Title</label>
                    <input onChange={handleOnChange} type="text" value={value} placeholder="Enter content please!" className="input"/>
                    </div>
                    <div className="text-right">
                        <button onClick={onCancel} type="button" className="button darkgray-background btn-cancel">Cancel</button>
                        <button type="submit" className={`button margin-l-10 ${!value ? 'disabled' : ''} btn-confirm`} disabled={!value}>Confirm</button>
                    </div>
                </form>
            </div>
        </div>
    </>
    )
}
export default CreateTodoModal