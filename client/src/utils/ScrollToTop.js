import React from "react";
import { useLocation } from "react-router-dom"; // Updated import for React Router 6

const ScrollToTop = () => {
  const location = useLocation(); // Use the useLocation hook instead of withRouter

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
};

export default ScrollToTop;
