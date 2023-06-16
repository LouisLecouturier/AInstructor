<<<<<<< HEAD
import React, { FC, ReactNode } from "react";
=======
"use client";
import React, { FC, useState } from "react";
>>>>>>> 3644213141a2c8eba3455065b2c95fa5f5f9b33d
import clsx from "clsx";

type column = {
  key: string;
  label: string;
};

type TableProps = {
  columns: column[];
  data: any[];
  title?: string;
  firstIsKey?: boolean;
  ordered?: boolean;
  className?: string;
<<<<<<< HEAD
  actions?: ReactNode[];
};

const Table: FC<TableProps> = (props) => {
  return (
    <table className={props.className}>
      <thead>
        <tr className={"border-b-2 border-accent-200"}>
          {props.ordered && <th className={clsx("text-start px-4 py-2")}>#</th>}
          {props.columns.map((column, index) => (
            <th
              key={column.key + index}
              className={clsx("text-start px-4 py-2")}
            >
              {column.label}
            </th>
          ))}
          {props.actions && (
            <th className={clsx("text-start px-4 py-2")}>Actions</th>
          )}
        </tr>
      </thead>
      <tbody>
        {props.data.map((row, index) => (
          <tr
            key={index}
            className={clsx(
              "h-8 font-medium",
              (index + 1) % 2 === 0 && "bg-accent-50"
            )}
          >
            {props.ordered && (
              <td
=======
  actions?: string[];
  selectable?: boolean;
  Delete?: (emails: string[]) => void;
};

const Table: FC<TableProps> = (props) => {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const getSelectedEmails = () => {
    return selectedRows.map((index) => props.data[index].email);
  };

  const handleRowSelect = (index: number) => {
    selectedRows.includes(index)
      ? setSelectedRows(selectedRows.filter((rowIndex) => rowIndex !== index))
      : setSelectedRows([...selectedRows, index]);
  };

  const computeHeader = () => {
    return (
      <header className="flex justify-between">
        {props.title && (
          <h2 className="text-2xl font-semibold">{props.title}</h2>
        )}
        <div className="flex gap-4 px-4">
          <span className="text-dark-200">
            {selectedRows.length} items selected
          </span>
          {selectedRows.length > 0 && (
            <div className="flex gap-2">
              {props.actions?.includes("delete") && (
                <Delete
                  onClick={() => {
                    if (props.Delete) {
                      props.Delete(
                        selectedRows.map((index) => props.data[index].email)
                      );
                      setSelectedRows([]);
                    }
                  }}
                  className="w-6 h-6"
                />
              )}

              {props.actions?.includes("edit") && <Edit className="w-6 h-6" />}
            </div>
          )}
        </div>
      </header>
    );
  };

  return (
    <>
      {(props.selectable || props.actions || props.title) && computeHeader()}
      <table className={props.className}>
        <thead>
          <tr className={"border-b-2 border-accent-200"}>
            {props.selectable && (
              <th className={clsx("text-start px-4 py-2")}></th>
            )}
            {props.ordered && (
              <th className={clsx("text-start px-4 py-2")}>#</th>
            )}
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
>>>>>>> 3644213141a2c8eba3455065b2c95fa5f5f9b33d
                className={clsx(
                  "px-4 py-2",
                  "text-dark-200/50",
                  "border-r-2 border-dark-500/5 last:border-none"
                )}
              >
<<<<<<< HEAD
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
=======
                {props.selectable && (
                  <td
                    className={clsx(
                      "px-4 py-2",
                      "text-dark-200/50",
                      "border-r-2 border-dark-500/5 last:border-none"
                    )}
                  >
                    <input
                      checked={selectedRows.includes(index)}
                      onChange={() => handleRowSelect(index)}
                      type="checkbox"
                    />
                  </td>
>>>>>>> 3644213141a2c8eba3455065b2c95fa5f5f9b33d
                )}
              >
                {row[column.key]}
              </td>
            ))}

<<<<<<< HEAD
            {props.actions && (
              <td
                className={clsx(
                  "px-4 py-2",
                  "border-r-2 border-dark-500/5 last:border-none"
                )}
              >
                {props.actions.map((action) => action)}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
=======
                {props.actions?.length != 0 && (
                  <td
                    className={clsx(
                      "px-4 py-2",
                      "border-r-2 border-dark-500/5 last:border-none",
                      "flex items-center justify-center"
                    )}
                  >
                    {/* {props.actions?.map((action) => action)} */}
                    <Options className="h-6 w-4 text-dark-500" />
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
>>>>>>> 3644213141a2c8eba3455065b2c95fa5f5f9b33d
  );
};

export default Table;
