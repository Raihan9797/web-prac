import classes from './Modal.module.css';
import {Fragment} from 'react';
import ReactDOM from 'react-dom';


function Backdrop(props) {
    return <div className={classes.backdrop} onClick={props.onClick}></div>
};

function ModalOverlay(props) {
    return <div className={classes.modal}>
        <div className={classes.content}>{props.children}</div>
    </div>

}

// the hook for the portal to latch on to
const portalElement = document.getElementById('overlays');


function Modal(props) {
    return <Fragment>
        {ReactDOM.createPortal(<Backdrop onClick ={props.onHideModal}/>, portalElement)}
        {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>,
         portalElement)}
    </Fragment>

};

export default Modal;