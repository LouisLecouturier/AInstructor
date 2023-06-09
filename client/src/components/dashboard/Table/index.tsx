import React, { FC } from "react";
import clsx from "clsx";

type TableProps = {
  columns: string[];
  data: any[];
  className?: string;
};

const Table: FC<TableProps> = (props) => {
  return (
    <table>
      <thead>
        <tr className={"border-b-2 border-accent-200 h-8"}>
          {props.columns.map((column, index) => (
            <th key={column + index} className={clsx("text-start")}>
              {column}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {props.data.map((row, index) => (
          <tr
            key={index}
            className={clsx("h-8", index + (1 % 2) === 0 && "bg-accent-50")}
          >
            {props.columns.map((column, index) => (
              <td key={column + index} className={clsx("text-start")}>
                {row[column]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
