import React, { FC, ReactNode } from "react";
import clsx from "clsx";

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
        {props.data.map((row, index) => {
          console.log(row);
          return (
            <tr
              key={index}
              className={clsx(
                "h-8 font-medium",
                (index + 1) % 2 === 0 && "bg-accent-50"
              )}
            >
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
                  {row[column.key]}
                </td>
              ))}

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
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
