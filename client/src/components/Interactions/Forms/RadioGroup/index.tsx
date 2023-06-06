import React, { useState } from "react";

import { RadioGroup } from "@headlessui/react";
import clsx from "clsx";
import Radio from "@components/Interactions/Forms/RadioGroup/Radio";

type Option = {
    value: string;
    label: string;
}

type RadioGroupProps = {
  defaultValue: string;
  options: Option[];
  name: string;
  onChange?: (value?: Option) => void;
  variant?: "accent" | "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  label: string;
  className?: string;
};

export default function MyRadioGroup(props: RadioGroupProps) {
  const [currentValue, setCurrentValue] = useState(props.options[0]);

  const onChange = (value: Option) => {
    setCurrentValue(value);
    props.onChange && props.onChange(value);
  }

  return (
    <RadioGroup
      value={currentValue}
      onChange={onChange}
      name={props.name}
      className={clsx("flex flex-col gap-2", props.className)}
    >
      <RadioGroup.Label className={"font-semibold"}>{props.label}</RadioGroup.Label>

      <div className={clsx("flex gap-4 text-dark-300")}>
        {props.options.map((option) => (
          <RadioGroup.Option key={option.value} value={option}>
            {({ checked }) => (
              <div className={clsx("flex items-center gap-2 font-bold")}>
                <Radio
                  variant={props.variant || "accent"}
                  size={props.size || "md"}
                  checked={checked}
                />
                <span>{option.label}</span>
              </div>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  );
}
