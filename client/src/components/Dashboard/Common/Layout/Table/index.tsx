import React, { FC, useState } from "react";
import clsx from "clsx";
import Delete from "@icons/Delete.svg";
import Edit from "@icons/Edit.svg";
import Check from "@icons/Checkmark.svg";
import { Button } from "@components/Layout/Interactions/Button";

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
  actions?: string[];
  selectable?: boolean;
  selectedRows?: any[];
  delete?: (filteredData: { email: string }[]) => void;
  submit?: (selectedRows: { uuid: string }[]) => void;
};

function checkUUIDExistence(toto: any[], popo: any[]) {
  const uuidList = toto.map((obj) => obj.uuid);
  return popo.map((obj) => uuidList.includes(obj.uuid));
}

const Table: FC<TableProps> = (props) => {
  const [selectedRows, setSelectedRows] = useState<boolean[]>(
    props.selectedRows !== undefined
      ? checkUUIDExistence(props.selectedRows, props.data)
      : Array(props.data.length).fill(false)
  );

  function filterDataByBoolean() {
    const filteredData: any[] = [];

    selectedRows.forEach((value, index) => {
      if (value) {
        filteredData.push(props.data[index]);
      }
    });
    return filteredData;
  }

  return (
    <div className={"w-full"}>
      <header className="flex justify-between">
        <h2 className={"flex items-center text-xl font-black"}>
          {props.title}
        </h2>

        {props.selectable && (
          <div className="flex gap-4 ">
            <span className="text-dark-200">
              {selectedRows.filter(Boolean).length} items selected
            </span>
            {selectedRows.length > 0 && (
              <div className="flex gap-2">
                {props.actions?.includes("delete") && (
                  <Delete
                    onClick={() => {
                      const data = filterDataByBoolean();
                      if (props.delete) {
                        props.delete(data);
                      }
                    }}
                    className="w-6 h-6"
                  />
                )}

                {props.actions?.includes("edit") && (
                  <Edit className="w-6 h-6" />
                )}
              </div>
            )}
          </div>
        )}
      </header>
      <div className={"flex flex-col gap-4"}>
        <table className={clsx("table-fixed w-full", props.className)}>
          <thead>
            <tr className={"border-b-2 border-accent-200"}>
              {props.selectable && (
                <th className={clsx("w-0 text-start px-4 py-2")}></th>
              )}
              {props.ordered && (
                <th className={clsx("w-0 text-start px-4 py-2")}>#</th>
              )}
              {props.columns.map((column, index) => (
                <th
                  key={column.key + index}
                  className={clsx(
                    "text-start px-4 py-2",
                    props.firstIsKey && index === 0 && "w-0"
                  )}
                >
                  {column.label}
                </th>
              ))}
              {/*{props.actions && props.actions.length > 0 &&  (*/}
              {/*  <th className={clsx("w-0 text-start px-4 py-2")}></th>*/}
              {/*)}*/}
            </tr>
          </thead>
          <tbody>
            {props.data.map((row, index) => {
              return (
                <tr
                  key={index}
                  className={clsx(
                    "h-8 w-fit font-medium",
                    (index + 1) % 2 === 0 && "bg-accent-50"
                  )}
                >
                  {props.selectable && (
                    <td
                      className={clsx(
                        "w-fit px-4 py-2",
                        "text-dark-200/50",
                        "border-dark-500/5 last:border-none"
                      )}
                    >
                      <input
                        checked={selectedRows[index]}
                        onChange={() => {
                          setSelectedRows(
                            selectedRows.map((value, i) =>
                              i === index ? !value : value
                            )
                          );
                        }}
                        type="checkbox"
                      />
                    </td>
                  )}
                  {props.ordered && (
                    <td
                      className={clsx(
                        "w-0 px-4 py-2",
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
                        props.firstIsKey && index === 0
                          ? "w-fit text-dark-200/50"
                          : "w-auto",
                        "border-r-2 border-dark-500/5 last:border-none"
                      )}
                    >
                      {String(row[column.key])}
                    </td>
                  ))}

                  {/*{props.actions && props.actions.length > 0 && (*/}
                  {/*  <td*/}
                  {/*    className={clsx(*/}
                  {/*      "w-fit px-4 py-2",*/}
                  {/*      "last:border-none",*/}
                  {/*      "flex items-center justify-center"*/}
                  {/*    )}*/}
                  {/*  >*/}
                  {/*    <Options className="h-6 w-4 text-dark-500" />*/}
                  {/*  </td>*/}
                  {/*)}*/}
                </tr>
              );
            })}
          </tbody>
        </table>

        {props.submit && (
          <Button
            rounded="full"
            onClick={() => {
              const data = filterDataByBoolean();
              if (props.submit) {
                props.submit(data);
              }
            }}
            className="flex gap-2"
          >
            <Check className="w-6 h-6" />
            <span>Save</span>
          </Button>
        )}
      </div>
    </div>
  );
};

export default Table;
