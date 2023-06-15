"use client"
import React, { FC, useState } from "react";
import clsx from "clsx";
import Options from "@icons/Options.svg";
import Delete from "@icons/Delete.svg";
import Edit from "@icons/Edit.svg";

type column = {
  key: string;
  label: string;
};

type TableProps = {
  columns: column[];
  data: any[];
  firstIsKey?: boolean;
  ordered?: boolean;
  className?: string;
  actions?: string[];
  selectable?: boolean;
  Delete? : (emails: string[]) => void;
};

const Table: FC<TableProps> = (props) => {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const getSelectedEmails = () => {
    return selectedRows.map((index) => props.data[index].email);
  };

  const handleRowSelect = (index: number) => {
    selectedRows.includes(index) ? 
    setSelectedRows(selectedRows.filter((rowIndex) => rowIndex !== index))
    :
    setSelectedRows([...selectedRows, index]);
  };

  return (

    <>

      <header className="flex justify-between">
        <h2 className={"flex items-center text-xl font-black"}>Members</h2>
        { props.selectable && 
        <div className="flex gap-4 px-4"> 
          <span className="text-dark-200">{selectedRows.length} items selected</span>
          {selectedRows.length > 0 &&
            <div className="flex gap-2">
              {props.actions?.includes("delete") &&
                <Delete 
                  onClick={() => {
                    if (props.Delete){
                      props.Delete(selectedRows.map((index) => props.data[index].email))
                      setSelectedRows([]);
                    }
                  }} 
                  className="w-6 h-6"/>
              }

              {props.actions?.includes("edit") && 
                <Edit className="w-6 h-6"/>
              }

            </div>
          }
        </div>
      }
      </header>
      <table className={props.className}>
        
        <thead>
          <tr className={"border-b-2 border-accent-200"}>
            {props.selectable && <th className={clsx("text-start px-4 py-2")}></th>}
            {props.ordered && <th className={clsx("text-start px-4 py-2")}>#</th>}
            {props.columns.map((column, index) => (
              <th
                key={column.key + index}
                className={clsx("text-start px-4 py-2")}
              >
                {column.label}
              </th>
            ))}
            
          </tr>
        </thead>
        <tbody>
          {props.data.map((row, index) => {
            return (
              <tr
                key={index}
                className={clsx(
                  "h-8 font-medium",
                  (index + 1) % 2 === 0 && "bg-accent-50"
                )}
              >
                {props.selectable && (
                  <td
                    className={clsx(
                      "px-4 py-2",
                      "text-dark-200/50",
                      "border-r-2 border-dark-500/5 last:border-none",
                    )}
                  >
                    <input checked={selectedRows.includes(index)} onChange={() => handleRowSelect(index)} type="checkbox" />
                  </td>
                )}
                {props.ordered && (
                  <td
                    className={clsx(
                      "px-4 py-2",
                      "text-dark-200/50",
                      "border-r-2 border-dark-500/5 last:border-none"
                    )}
                  >
                    {index + 1}
                  </td>
                )}
                {props.columns.map((column, index) => (
                  <td
                    key={column.key + index}
                    className={clsx(
                      "px-4 py-2",
                      props.firstIsKey && "first:text-dark-200/50",
                      "border-r-2 border-dark-500/5 last:border-none"
                    )}
                  >
                    {String(row[column.key])}
                  </td>
                ))}

                {props.actions?.length != 0 && (
                  <td
                    className={clsx(
                      "px-4 py-2",
                      "border-r-2 border-dark-500/5 last:border-none",
                      "flex items-center justify-center",
                    )}
                  >
                    {/* {props.actions?.map((action) => action)} */}
                    <Options className="h-6 w-4 text-dark-500"/>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>

  );
};

export default Table;
