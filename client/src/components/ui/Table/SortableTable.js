import { useState } from 'react';
import { GoArrowDown, GoArrowUp } from 'react-icons/go';
import Table from './Table';

function SortableTable(props) {
  const [sortOrder, setSortOrder] = useState(null);
  const [sortBy, setSortBy] = useState(null);
  const { config, data } = props;

  const handleClick = (label) => { 


      // Check if the selected value is 'default'
    if (label === "default") {
      // Do nothing or perform some other action if needed
      return;
    }


    if (sortBy && label !== sortBy) {
      setSortOrder('asc');
      setSortBy(label);
      return;
    }

    if (sortOrder === null) {
      setSortOrder('asc');
      setSortBy(label);
    } else if (sortOrder === 'asc') {
      setSortOrder('desc');
      setSortBy(label);
    } else if (sortOrder === 'desc') {
      setSortOrder(null);
      setSortBy(null);
    }

    label = "default";


  };



  const updatedConfig = config.map((column) => {
    if (!column.sortValue) {
      return column;
    }

    return {
      ...column,
      header: () => (
        <th
          onClick={() => handleClick(column.label)}
        >
            <span class="sorting-wraper">
              {/* {column.label} */}
              {getIcons(column.label, sortBy, sortOrder)}
            </span>
        </th>
      ),
    };
  });


  /*
   This is the select dropdown that appears at the the top, to replace the header row
   on the table in mobile view. The sorting options comes from the labels in the component that is using this table. If label is anything other than a string it won't display properly ie.. [object Object].
  */
  const renderSelectDropdown = config.map((column) => {

    if (!column.sortValue) {
      return column;
    }

    return {
      ...column,
      header: () => (
        <option
          value={column.label}
        >
            {column.label}
        </option>
      ),
    };
  });



  /**
   * Todo: If we go with the dropdown list version we may need to return something like this: { label: column.label, value: column.label}
   */

  // const renderSelectDropdown = config.map((column) => {

  //   if (!column.sortValue) {
  //     return column;
  //   }

  //   return {
  //     ...column,
  //     header: () => (
  //       column.label
  //     ),
  //   };
  // });

      

  // Only sort data if sortOrder && sortBy are not null
  // Make a copy of the 'data' prop
  // Find the correct sortValue function and use it for sorting
  let sortedData = data;
  if (sortOrder && sortBy) {
    const { sortValue } = config.find((column) => column.label === sortBy);
    sortedData = [...data].sort((a, b) => {
      const valueA = sortValue(a);
      const valueB = sortValue(b);

      const reverseOrder = sortOrder === 'asc' ? 1 : -1;

      if (typeof valueA === 'string') {
        return valueA.localeCompare(valueB) * reverseOrder;
      } else {
        return (valueA - valueB) * reverseOrder;
      }
    });
  }

  return (
            <Table 
              {...props} 
              data={sortedData} 
              config={updatedConfig}
              sortOrder={sortOrder}
              sortBy={sortBy}
              selectDropdown={renderSelectDropdown}
              handleClick={handleClick}
            />
        )
}

function getIcons(label, sortBy, sortOrder) {
  if (label !== sortBy) {
    return (
      <>
        <GoArrowUp />
        { label }
        <GoArrowDown />
      </>
    );
  }

  if (sortOrder === null) {
    return (
      <>
        <GoArrowUp />
        { label}
        <GoArrowDown />
      </>
    );
  } else if (sortOrder === 'asc') {
    return (
      <>
        <GoArrowUp />
        { label}
      </>
    );
  } else if (sortOrder === 'desc') {
    return (
      <>
        <GoArrowDown />
      { label }
      </>
    );
  }
}

export default SortableTable;
