import React, { useState, useEffect, useRef } from "react";
import { Panel } from "components/ui/Layout/Panel";
import SearchIcon from "assets/images/Icon-search.svg";
import { useSelector, useDispatch } from "react-redux";
import { searchSurveys } from "ReduxStore";
import { Link } from "react-router-dom";
import { dashBoardPath } from 'pages/Dashboard/utils/constants';


export const Search = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const timeoutRef = useRef(null);

  const [values, setValues] = useState({
    searchTerm: "",
    results: [],
    message: "",
  });

  const { searchTerm, results, message } = values;

  const { searchResults } = useSelector((store) => store.surveys);

  const dispatch = useDispatch();

  useEffect(() => {
    if (searchTerm) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        dispatch(searchSurveys(searchTerm)); 
      }, 800);
    }
  }, [searchTerm, dispatch]);

  useEffect(() => {
    
    if (searchResults) {
      
      setValues({
        ...values,
        results: searchResults,
        message: searchResults.length > 0 ? `See all ${searchResults.length} results found` : `No results found`
      });   
    } 
    
    
  }, [searchResults])


  // Show the dropdown when there is input
  const handleInputChange = (e) => {
    setShowDropdown(e.target.value.length > 0);
    setValues({
      ...values,
      searchTerm: e.target.value,
    });
  };

  // Hide dropdown when input loses focus
  const handleInputBlur = () => {
 
    // Delay hiding the dropdown so that we can capture the click event on the dropdown
    setTimeout(() => {
      setShowDropdown(false);
      setValues({
        ...values,
        searchTerm: "",
      });
    }, 500); // Adjust the delay as needed
  };
  



  return (
    <div className="search-input">
      <img src={SearchIcon} alt="" className="icon search-icon" />
      <input 
        type="text" 
        placeholder="Search For Surveys" 
        className="search-box" 
        onChange={handleInputChange} 
        onBlur={handleInputBlur} 
      />
      <Panel className={`search-dropdown ${showDropdown ? "show" : ""}`}>
        <ul className="panel-content">
          {results.map((survey, index) => (
            <Link to={`${dashBoardPath}/surveydetail/${survey._id}`} key={index}>
              <li key={index}>{survey.title}</li>
            </Link>
          ))}
        </ul>

        <div className="results">
          <span>{message}</span>
        </div>
      </Panel>
    </div>
  );
};
