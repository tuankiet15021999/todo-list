import React, { useState } from 'react'
const Collapse = ({
    children,
    title
}) => {
    const [toggle, setToggle] = useState(false)
    const triggerToggle = () =>{
        setToggle(!toggle)
    }
    return (
    <div>
        <div onDoubleClick={triggerToggle}>{title}</div>
        <div hidden={!toggle} className={`${toggle ? 'expandable toggle' : 'expandable'}`}>{children}</div>
    </div>
    )
}
export default Collapse