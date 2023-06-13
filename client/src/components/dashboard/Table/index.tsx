import React, { FC } from "react";
import clsx from "clsx";

type TableProps = {
  columns: string[];
  data: any[];
  firstIsKey?: boolean;
  className?: string;
};

const Table: FC<TableProps> = (props) => {
  return (
    <table className={props.className}>
      <thead>
        <tr className={"border-b-2 border-accent-200"}>
          {props.columns.map((column, index) => (
            <th key={column + index} className={clsx("text-start px-4 py-2")}>
              {column}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {props.data.map((row, index) => {
          const columns: any[] = Object.values(row).slice(
            0,
            props.columns.length
          );
          return (
            <tr
              key={index}
              className={clsx(
                "h-8 font-medium",
                (index + 1) % 2 === 0 && "bg-accent-50"
              )}
            >
              {columns.map((column, index) => (
                <td
                  key={column + index}
                  className={clsx(
                    "px-4 py-2",
                    props.firstIsKey && "first:text-dark-200/50",
                    "border-r-2 border-dark-500/5 last:border-none"
                  )}
                >
                  {column}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
