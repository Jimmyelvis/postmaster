import { Fragment, useState, useEffect } from 'react';
import { GoArrowDown, GoArrowUp } from 'react-icons/go';


const Table = ({ 
  data, config, keyFn, sortOrder, 
  sortBy, selectDropdown,handleClick
}) => {

  const [dataSortOrder, setdataSortOrder] = useState(null)
  const [dataSortBy, setdataSortBy] = useState(null)



  const renderedHeaders = config.map((column) => {
    if (column.header) {

      return <Fragment key={column.label}>
        {
          column.header()
        }
      </Fragment>;
    }

    return <th key={column.label}>{column.label}</th>;
  });



  const renderedRows = data.map((rowData) => {
    const renderedCells = config.map((column) => {
      return (
        <td  
          key={column.label} 
          data-label={column.mobile_label ? column.mobile_label + ":" : ""}
          className="mobile-label"
        >
          <span className="value">
            {column.render(rowData)}
          </span>
        </td>
      );
    });

    return (
      <tr key={keyFn(rowData)}>
        {renderedCells}
      </tr>
    );
  }); 
  

  const getDropotions = () => {
    
    const renderSelectDropdown = selectDropdown.map((column) => {
      
      if (column.header) {
  
        return <Fragment key={column.label}>
          {
            column.header()
          }
        </Fragment>;
      }
  
    });

    return (
      <div class="selector">
        <select
          onClick={(e) => handleClick(e.target.value)}
          className="select-input"
        >
          <option value="default">Select Option</option>
          {renderSelectDropdown}
        </select>
        <div class="custom-arrow"></div>
      </div>
    )
  }


  return (
    <>

      <div className="table-header">
        <h2>Sort By:</h2>

        {getDropotions()}

      </div>
    
      <table className="table">
      
          <tr>{renderedHeaders}</tr>
      
        <tbody>{renderedRows}</tbody>
      </table>

    </>
    
  );
}

export default Table;
