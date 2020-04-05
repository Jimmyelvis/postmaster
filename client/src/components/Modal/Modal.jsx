import React from 'react';

// import './Modal.css';

const modal = (props) => {
    return (
        <React.Fragment>

            <div className="modal-wrapper"
                style={{
                    opacity: props.show ? '1' : '0',
                    zIndex: props.show ? '2000' : '0',
                    visibility: props.show ? 'visible' : 'hidden',
                    // transform: props.show ? 'translateY(0vh)' : 'translateY(-100vh)',
                    // display: props.show ? 'block' : 'none'
                }}>
                    <div className="modal-container">

                        {props.children}

                    </div>
                    
            </div>

        </React.Fragment>
    )
}

export default modal;
