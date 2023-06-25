import React, { FC, ReactNode } from "react";
import Input from "@components/Layout/Interactions/Forms/Input";
import Skeleton from "@components/Layout/Skeleton";
import clsx from "clsx";

type InformationProps = {
  label: string;
  value: ReactNode;
  editable?: boolean;
  isTextArea?: boolean;
  isLoading?: boolean;
  name?: string;
};

const Information: FC<InformationProps> = (props) => {
  if (props.editable && props.name) {
    return (
      <div className={"flex flex-col gap-0.5"}>
        <h4 className={"font-bold"}>{props.label}</h4>
        {props.isLoading ? (
          <Skeleton
            className={clsx("w-full", props.isTextArea ? "h-24" : "h-8")}
          />
        ) : (
          <Input
            size={"sm"}
            name={props.name}
            defaultValue={props.value?.toString()}
            textarea={props.isTextArea}
            borders
          />
        )}
      </div>
    );
  }

  return (
    <div className={"flex flex-col gap-0.5"}>
      <h4 className={"font-bold"}>{props.label}</h4>
      {props.isLoading ? (
        <Skeleton className={"w-full h-8"} />
      ) : (
        <span>{props.value}</span>
      )}
    </div>
  );
};

export default Information;
