"use client";

import React, { FC } from "react";

import Edit from "@icons/Edit.svg";
import Show from "@icons/Show.svg";
import Delete from "@icons/Delete.svg";
import clsx from "clsx";
import styles from "./ListItem.module.scss";

type Property = {
  label: string;
  value: string;
};

type ListItemProps = {
  children?: React.ReactNode;
  properties: Property[];
  withUserActions?: boolean;
  onDelete?: () => void;
  onEdit?: () => void;
  onSee?: () => void;
};

const ListItem: FC<ListItemProps> = (props) => {
  return (
    <article className="grid grid-cols-6 w-full py-4 bg-white items-center justify-between px-6 gap-4 rounded-xl">
      <span className="col-span-2 font-semibold text-dark-500 text-lg">
        {props.children}
      </span>
      <div className="flex col-span-3 gap-2 justify-between">
        {props.properties.map((property) => {
          return (
            <div key={property.label} className="flex items-center gap-2">
              <span className="text-dark-500 text-sm font-semibold">
                {property.label} :
              </span>
              <span className="text-dark-500 text-xs">{property.value}</span>
            </div>
          );
        })}
      </div>
      {props.withUserActions && (
        <div
          className={clsx(
            "flex gap-2 justify-self-end",
            styles["interactions"]
          )}
        >
          <Show onClick={props.onSee} />
          <Edit onClick={props.onEdit} />
          <Delete onEdit={props.onDelete} />
        </div>
      )}
    </article>
  );
};

export default ListItem;
