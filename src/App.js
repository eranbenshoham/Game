import React from "react";
import styled from "styled-components";
import { useTable, usePagination } from "react-table";
import externalFile from './Configurations'
import makeData from "./makeData";

import ReactExport from "react-data-export";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const currency = externalFile.currencySymbol;
const totalBudget = externalFile.totalBudget; // Here we should get the total budget from external source

const Styles = styled.div`
  padding: 1rem;
  /* background: -webkit-linear-gradient(bottom,#c471f5,#fa71cd); */
  /* background: linear-gradient(45deg,#4158d0,#c850c0); */
    color: white;
  * {outline: none;}
  /* font-family: sans-serif; */
  /* Hide the first header row */

  .header0 {
    display: none;
  }

  .header1 {
    background: #36304a;
  }

  h1 {
    text-align: center;
  }

  button {
     display:inline-block;
    padding: 0.3em 1.2em;
    margin: 0 0.1em 0.1em 0;
    border: 0.16em solid rgba(255,255,255,0);
    border-radius: 2em;
    box-sizing: border-box;
    text-decoration: none;
    font-family: 'Roboto',sans-serif;
    font-weight: 300;
    color: #FFFFFF;
/*     text-shadow: 0 0.04em 0.04em rgba(0,0,0,0.35); */
    text-align: center;
    transition: all 0.2s;
     /* background-color: #84f14e; */
     background-color: #4e9af1;
  }

  button:disabled {
  background-color: #cccccc !important;
  color: #666666;
  cursor: not-allowed !important;
  }

  button:hover{
  border-color: rgba(44,165,200,1);
  border: 2px solid;
  }

  /* button:disabled:hover {
    border: none !important;
  } */
  
  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
      :first-child {
        font-weight: bold;
        text-align: left;
        font-size: 17px;
      }

      span {
        white-space: pre-line;
        display: block;
      }
    }
    .dataTD {
      cursor: pointer;
    }
  }
  .highlight {
    background: #a3a9ff;;
  }

  .pagination {
    /* padding: 0.5rem; */
    margin-top: 20px;
  }
  .submitContainer {
    text-align: center;
    .submitButton {
    width: 200px;
    height: 50px;
    font-size: 1rem;
    font-weight: bold;
    background-color: #4e9af1;
    cursor: pointer;
  }
  
  }
  .budgetContainer {
    display: flex;
    margin-bottom: 10px;
    padding: 10px;
    align-items: center;
    justify-content: space-between;
    /* :first-child {
      min-width: 120px;
      display: inline-block;
      border: 1px solid black;
      padding: 10px;
      font-weight: 700;
    } */
    .resetButton {
      background-color: transparent;
      border: 2px solid white;
      // color: #02c4d8;
      font-weight: 700;
      :hover {
        background-color: #8d28975e !important;
        border: 1px solid white;
        cursor: pointer;
      }
    }
    .budgetLabel {
      font-weight: 700;
      font-size: 25px;
      margin: 0;
    }
    .currentAmount {
      min-width: 120px;
      display: inline-block;
      // border: 1px solid black;
      font-size: 25px;
      padding: 10px;
      // background-color: #4ef18f;
      font-weight: 700;
      span {
        margin-left: 30px;
      }
    }
    .shakeTotal {
      border-radius: 30px;
      background-color: #f50600a8;
      animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) both;
      transform: translate3d(0, 0, 0);
      backface-visibility: hidden;
      perspective: 1000px;
    }
    @keyframes shake {
    10%, 90% {
    transform: translate3d(-1px, 0, 0);
    }
  
    20%, 80% {
    transform: translate3d(2px, 0, 0);
    }

    30%, 50%, 70% {
    transform: translate3d(-4px, 0, 0);
    }

    40%, 60% {
    transform: translate3d(4px, 0, 0);
    }
    }
  }

  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
  }

  .modal-main {
    display: flex;
    flex-direction: column;
    max-width: 310px;
    padding: 30px;
    border-radius: 10px;
    position: fixed;
    background: white;
    width: 80%;
    height: auto;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 1px solid white;
    background: linear-gradient(21deg,#41587B,#C85046);
    // border: 3px solid black;
    // background: linear-gradient( 45deg,#4158d0,#c850c0);

    .modalButtonsContainer {
      align-self: center;
      margin-top: 25px;
      button:hover {
        cursor: pointer;
      }
      button:last-child {
        // color: black;
        background: transparent;
        border: 1px solid white;
      }
    }

    .modalInput {
      border: 1px solid black;
    }
  }

  .display-block {
    display: block;
  }

  .display-none {
    display: none;
  }
`;

// Create an editable cell renderer
const EditableCell = ({
  value: initialValue,
  row: { index },
  column: { id },
  updateMyData // This is a custom function that we supplied to our table instance
}) => {
  // We need to keep and update the state of the cell normally
  const [value, setValue] = React.useState(initialValue);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const handleOnClick = () => {
    updateMyData(index, id, value);
  };

  // If the initialValue is changed external, sync it up with our state
  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <span onChange={onChange} onClick={handleOnClick}>
      {value}
    </span>
  );
};

// Set our editable cell renderer as the default Cell renderer
const defaultColumn = {
  Cell: EditableCell
};

// Be sure to pass our updateMyData and the skipPageReset option
function Table({ columns, data, updateMyData, skipPageReset }) {
  // For this example, we're using pagination to illustrate how to stop
  // the current page from resetting when our data changes
  // Otherwise, nothing is different here.
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      // use the skipPageReset option to disable page resetting temporarily
      autoResetPage: !skipPageReset,
      // updateMyData isn't part of the API, but
      // anything we put into these options will
      // automatically be available on the instance.
      // That way we can call this function from our
      // cell renderer!
      updateMyData
    },
    usePagination
  );
  // Render the UI for your table
  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup, index) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} className={`header${index}`}>
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell, j) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      className={`${cell.row.original.highlightRow === i &&
                        cell.row.original.highlightCol === j
                        ? "highlight"
                        : j === 0 ? "" : "dataTD"
                        }`}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="pagination">
      </div>
    </>
  );
}

const Modal = ({
  show,
  handleClose,
  handleSave,
  handleNameChange,
  value,
  children
}) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";
  return (
    <div className={showHideClassName}>
      <div className="modal-main">
        <div>
          <span>Enter Your Name: </span>
          <input
            type="text"
            placeholder="First Name"
            value={value}
            onChange={handleNameChange}
            className="modalInput"
          />
        </div>
        <div className="modalButtonsContainer">
          <button type="button" onClick={handleSave} disabled={value === ""}>
            Save
          </button>
          <button type="button" onClick={handleClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

function App() {
  console.log('externalFile.tableData: ', externalFile.tableData)
  // const sideHeaders =  Object.values(externalFile.sideHeaders)
  const sideHeaders =  externalFile.sideHeaders
  const columns = React.useMemo(
    () => [
      {
        Header: "Product investment area",
        id: "TAL",
        Cell: ({row}) => {
          return <span>{sideHeaders[parseInt(row?.id)]}</span>;
        }
      },
      {
        Header: '',
        id: "123",
        columns:
          externalFile.topHeaders.map((headerObj, index) => ({
              Header: headerObj?.columnName,
              accessor: (index + 1).toString(),
              value: headerObj?.value
            }))
      }
    ],
    []
  );

  const [data, setData] = React.useState(() => makeData(5));
  const [originalData] = React.useState(data);
  const [skipPageReset, setSkipPageReset] = React.useState(false);
  const [show, showModal] = React.useState(false);
  const [userName, setUserName] = React.useState("");
  const [totalAmount, setTotalSelectedItems] = React.useState(0);
  const [exportExcel, setExportExcel] = React.useState(false)
  const [userDataForExcel, setUserDataForExcel] = React.useState([])
  // We need to keep the table from resetting the pageIndex when we
  // Update data. So we can keep track of that flag with a ref.

  // When our cell renderer calls updateMyData, we'll use
  // the rowIndex, columnId and new value to update the
  // original data

  const updateMyData = (rowIndex, columnId, value) => {
    // We also turn on the flag to not reset the page
    console.log(
      "check this: ",
      "row:",
      rowIndex,
      " column:",
      columnId,
      " value: ",
      value
    );
    // setSkipPageReset(true);
    setData((old) => {
      return old.map((row, index) => {
        if (index === rowIndex) {
          const isHighlight =
            rowIndex === old[rowIndex].highlightRow &&
            parseInt(columnId, 10) === old[rowIndex].highlightCol;
          return {
            ...old[rowIndex],
            [columnId]: value,
            highlightRow: isHighlight ? -1 : rowIndex,
            highlightCol: isHighlight ? -1 : parseInt(columnId, 10),
            value: isHighlight
              ? old[rowIndex].value -
              columns[1].columns[parseInt(columnId, 10) - 1].value
              : columns[1].columns[parseInt(columnId, 10) - 1].value
          };
        }
        return row;
      });
    });
  };

  const calculateBudget = () => {
    let sum = 0;
    data.forEach((item) => {
      sum += item?.value ?? 0;
    });
    setTotalSelectedItems(sum);
  };

  const openModal = () => {
    showModal(true);
  };

  const handleClose = () => {
    showModal(false);
    setUserName("");
  };

  const handleSave = () => {
    const selectedItems = getSelectedItems();
    const date = new Date().toString();
    const result = {
      selectedItems,
      userName,
      date,
      totalBudget
    }
    setUserDataForExcel([result])
    setExportExcel(true)
    handleClose();
  };

  const getSelectedItems = () => {
    const result = [];
    data.forEach((item) => {
      item.value && result.push({
        text: item[item?.highlightCol],
        row: item?.highlightRow,
        col: item?.highlightCol,
        value: item?.value
      });
    });
    return result;
  };

  const handleNameChange = (e) => {
    e.persist();
    setUserName(e.target.value);
  };
  // After data chagnes, we turn the flag back off
  // so that if data actually changes when we're not
  // editing it, the page is reset
  React.useEffect(() => {
    setSkipPageReset(false);
    calculateBudget();
  }, [data]);

  // React.useEffect(() => {
  //   console.log('Going To Export Excel')
  //   console.log("result: ", userDataForExcel);
  //   if(userDataForExcel.length) {
  //     handleClose();
  //     setExportExcel(true)
  //   }
  //   // userDataForExcel.length && setExportExcel(true)
  // }, [userDataForExcel])

  // Let's add a data resetter/randomizer to help
  // illustrate that flow...
  const resetData = () => {
    setData(originalData);
  };

  const dataSet2 = [
    {
      name: "Johnson",
      total: 25,
      remainig: 16
    },
    {
      name: "Josef",
      total: 25,
      remainig: 7
    }
  ];
  const stam = [{...externalFile}]
  console.log('stam: ', stam)

  const data5 = [
    {
      columns: stam[0]?.topHeaders?.map((item) => {
        return {
          title: item.columnName,
        }
      }),
      data: stam[0].sideHeaders.map((header) => {
        return [{value: header}]
      }),
    },
  ];
  console.log('data5: ', data5)
  return (
    <Styles>
      <h1>Optima Game</h1>
      {exportExcel &&
        <ExcelFile hideElement={exportExcel} filename="Optima-Game">

          <ExcelSheet data={userDataForExcel} name="User Data">
            <ExcelColumn label="User Name" value="userName" />
            <ExcelColumn label="Total Budget" value="totalBudget" />
            <ExcelColumn label="Date" value="date" />
            {/* <ExcelColumn label="Marital Status"
              value={(col) => col.is_married ? "Married" : "Single"} /> */}
          </ExcelSheet>

          <ExcelSheet data={userDataForExcel[0]?.selectedItems} name="Selected Items">
            <ExcelColumn label="Item" value="text" />
            <ExcelColumn label="Row" value="row" />
            <ExcelColumn label="Col" value="col" />
            <ExcelColumn label="Value" value="value" />
          </ExcelSheet>

          <ExcelSheet dataSet={data5} name="Configuration"></ExcelSheet>
        </ExcelFile>
      }
      <div>
        <Modal
          show={show}
          handleClose={handleClose}
          handleSave={handleSave}
          handleNameChange={handleNameChange}
          value={userName}
        ></Modal>
        <div className="budgetContainer">
          <div>
            <p className="budgetLabel">Budget: {currency}{totalBudget.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
          </div>
          <div
            className={`currentAmount ${totalAmount > totalBudget ? "shakeTotal" : ""
              }`}
          >
            Total: <span>{currency}{totalAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
          </div>
          <div>
            <button onClick={resetData} className="resetButton">
              Reset Data
            </button>
          </div>
        </div>
      </div>
      <Table
        columns={columns}
        data={data}
        updateMyData={updateMyData}
        skipPageReset={skipPageReset}
      />
      <div className="submitContainer">
        <button
          type="text"
          className="submitButton"
          onClick={openModal}
          disabled={totalAmount > totalBudget}
        >
          Submit
        </button>
      </div>
    </Styles>
  );
}

export default App;
