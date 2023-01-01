import { Box, Button } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useTable, useSortBy } from "react-table";
function Table(props: any) {
  const { columns, data } = props;

  const tableProps = useTable(
    {
      columns,
      data,
    },
    useSortBy
  );
  const {
    rows,
    setHiddenColumns,
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    allColumns,
    visibleColumns,
  } = tableProps;
  useEffect(() => {
    const total = visibleColumns?.reduce((count, ele) => {
      return count + ele.totalWidth;
    }, 0);
    console.log("total width===", total);
  }, [visibleColumns]);
  console.log("all===", allColumns, "visible", visibleColumns);
  return (
    <div>
      <Button
        onClick={() => {
          setHiddenColumns((a) => [...a, "1"]);
        }}
      >
        hide col1
      </Button>
      <Button
        onClick={() => {
          setHiddenColumns(["2"]);
        }}
      >
        hide col2
      </Button>
      <table {...getTableProps()}>
        <thead>
          {
            // Loop over the header rows
            headerGroups.map((headerGroup) => (
              // Apply the header row props
              <tr {...headerGroup.getHeaderGroupProps()}>
                {
                  // Loop over the headers in each row
                  headerGroup.headers.map((column) => (
                    // Apply the header cell props
                    <th {...column.getHeaderProps()}>
                      {
                        // Render the header
                        column.render("Header")
                      }
                    </th>
                  ))
                }
              </tr>
            ))
          }
        </thead>
        {/* Apply the table body props */}
        <tbody {...getTableBodyProps()}>
          {
            // Loop over the table rows
            rows.map((row) => {
              // Prepare the row for display
              prepareRow(row);
              return (
                // Apply the row props
                <tr {...row.getRowProps()}>
                  {
                    // Loop over the rows cells
                    row.cells.map((cell) => {
                      // Apply the cell props
                      return (
                        <td {...cell.getCellProps()}>
                          {
                            // Render the cell contents
                            cell.render("Cell")
                          }
                        </td>
                      );
                    })
                  }
                </tr>
              );
            })
          }
        </tbody>
      </table>
      <style jsx>
        {`
          padding: 1rem;

          table {
            border-spacing: 0;
            border: 1px solid black;
          }
          th,
          td {
            margin: 0;
            padding: 0.5rem;
            border-bottom: 1px solid black;
            border-right: none;
          }
        `}
      </style>
    </div>
  );
}

export default Table;
