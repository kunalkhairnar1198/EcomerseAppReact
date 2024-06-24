import React, { Fragment } from 'react'
import  ReactDOM  from 'react-dom'



const Backdrop = (props)=>{
    return(
        <div/>
    )
}

const ModalOverlay=(props)=>{
    return(
        <div >
            <div >{props.children}</div>
        </div>
    )
}

const portalEle = document.getElementById('overlay')

const Modal = (props) => {
  return (
    <Fragment>
        {ReactDOM.createPortal(
        <Backdrop/>,
        portalEle
        )}
        {ReactDOM.createPortal(
            <ModalOverlay>
                {props.children}
            </ModalOverlay>
        ,portalEle)}
    </Fragment>
  )
}

export default Modal