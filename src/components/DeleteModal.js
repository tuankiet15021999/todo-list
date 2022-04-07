import React from 'react'
const DeteleModal = ({
    content,
    onCancel,
    onConfirm
}) => {
    return (
    <>
        <div className="modal">
            <div className="modal-container">
                <form>
                    <div>
                        <h2 className="float-left">Delete Todo</h2>
                        <span onClick={onCancel()} className="close-modal float-right">&times;</span>
                    </div>
                    <div className="clear padding-10">
                        <p>Do you want to delete {content}?</p>
                    </div>
                    <div className="text-right">
                        <button onClick={onCancel()} className="button darkgray-background btn-cancel">Cancel</button>
                        <button className="button margin-l-10 btn-confirm" onClick={onConfirm}>Confirm</button>
                    </div>
                </form>
            </div>
        </div>
    </>
    )
}
export default DeteleModal