import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import TwitterIcon from "assets/images/twitter.svg";
import FacebookIcon from "assets/images/facebook.svg";
// import { registerUser } from "../../actions";

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

  const onRegisterSubmit = (e) => {
    e.preventDefault();

    const userData = {
      username,
      password,
    };

    // dispatch(registerUser(userData));
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
          <button className="btn btn--signup-header" onClick={openModalHandler}>
            <h5>SIGN UP</h5>
          </button>) : (  "" )
        }
        <div className="copyright">
          <p>&copy; 2023 ThePostMaster</p>
        </div>
      </>
    );

  
    }



  return (
    <>
      <div className="footer">{renderContent()}</div>
      {isShowing && <div onClick={closeModalHandler} className="back-drop" />}
      {/* <Modal className="modal" show={isShowing} close={closeModalHandler} heading="Login">
        Modal content for now
      </Modal> */}
    </>
  );
};


