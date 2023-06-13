import React, { FC, ReactNode } from "react";
import Input from "@components/Interactions/Forms/Input";

type InformationProps = {
  label: string;
  value: ReactNode;
  editable?: boolean;
  isTextArea?: boolean;
  name?: string;
};

const Information: FC<InformationProps> = (props) => {
  if (props.editable && props.name) {
    return (
      <div className={"flex flex-col gap-0.5"}>
        <h4 className={"font-bold"}>{props.label}</h4>
        <Input
          size={"sm"}
          name={props.name}
          defaultValue={props.value?.toString()}
          textarea={props.isTextArea}
          borders
        />
      </div>
    );
  }

  return (
    <div className={"flex flex-col gap-0.5"}>
      <h4 className={"font-bold"}>{props.label}</h4>
      <span>{props.value}</span>
    </div>
  );
};

export default Information;
