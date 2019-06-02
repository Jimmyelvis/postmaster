import React from 'react';

import './Modal.css';

const modal = (props) => {
    return (
        <div>
            <div className="modal-wrapper"
                style={{
                    opacity: props.show ? '1' : '0',
                    zIndex: props.show ? '2000' : '0',
                    // transform: props.show ? 'translateY(0vh)' : 'translateY(-100vh)',
                    // display: props.show ? 'block' : 'none'
                }}>
                
                <div className="modal-body">
                   
                        {props.children}
                    
                </div>
               
            </div>
        </div>
    )
}

export default modal;
