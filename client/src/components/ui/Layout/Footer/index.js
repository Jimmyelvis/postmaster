import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Modal from "pages/Dashboard/components/Modal";
import { openModal, setOrigin } from "ReduxStore/slices/dashboardUISlice";
import { Register } from "components/ui/Layout/AuthForms/Register";

export const Footer = () => {
  const [isShowing, setIsShowing] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [localErrors, setLocalErrors] = useState("");

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const errors = useSelector((state) => state.errors);

  const openModalHandler = (e) => {
    e.preventDefault();
    setIsShowing(true);
  };

  const closeModalHandler = () => {
    setIsShowing(false);
  };


  
  /**
   * Piece of state that will be used to determine, what component
   * that wil be rendered in the modal
   */
  const [modalTarget, setModalTarget] = useState(null);

  /*
    This will be used to determine what component called the modal
    this will be passed as a prop to the modal component, and the 
    modal context 
  */
  const [compOrigin, setCompOrigin] = useState(null);

  const checkTarget = () => {
    if (modalTarget === "footer register modal") {
      return <Register />;
    }
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    name === "username" ? setUsername(value) : setPassword(value);
  };

  useEffect(() => {
    if (errors) {
      setLocalErrors(errors.msg);

      setTimeout(() => {
        setLocalErrors("");
      }, 3000);
    }
  }, [errors]);

  const renderContent = () => {

    return (
      <>
        <h2 className="heading-2 mb-md">
          Improve Your Business
        </h2>

        {
          auth.user === "" ? (
          <button className="btn btn--signup-header" 
          onClick={(e) => {
            dispatch(openModal());
            e.preventDefault();
            setModalTarget("footer register modal");
            setCompOrigin("footer");
            dispatch(setOrigin("footer"));
          }}
          >
            <h5>SIGN UP</h5>
          </button>) : (  "" )
        }
        <div className="copyright">
          <p>&copy; 2024 ThePostMaster</p>
        </div>
      </>
    );

  
    }



  return (
    <>
      <div className="footer">
        {renderContent()}
      </div>
      
      <Modal selector={"#modal"} modalTarget={modalTarget} modalOrigin={compOrigin} overlayColor={"rgba(1, 5, 16, 0.94)"}>
        {checkTarget()}
      </Modal>
    </>
  );
};


