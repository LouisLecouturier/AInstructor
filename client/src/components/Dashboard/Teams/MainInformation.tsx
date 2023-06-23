import { Button } from "@components/Layout/Interactions/Button";
import Input from "@components/Layout/Interactions/Forms/Input";
import React, { FC, FormEvent, useRef, useState } from "react";
import Container from "@components/Layout/Container";
import { Team } from "@/types/team";
import clsx from "clsx";

type TeamMainInformationProps = {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  team?: Team;
  editable?: boolean;
};

export const TeamInformations: FC<TeamMainInformationProps> = (props) => {
  const [color, setColor] = useState(props.team?.color ?? "#000000");

  const formRef = useRef<HTMLFormElement>(null);

  return (
    <Container
      title={"Team informations"}
      action={
        props.team &&
        props.editable && (
          <Button variant="accent" size="sm" rounded="full" type="submit">
            Update Team
          </Button>
        )
      }
    >
      <form
        ref={formRef}
        onSubmit={props.onSubmit}
        className="flex flex-col gap-8 w-full max-w-[800px]"
      >
        <div className="flex flex-row w-full flex-1 flex-wrap gap-8">
          <div className="flex flex-col w-48 gap-4 justify-between">
            <div className="w-full flex items-start aspect-square flex-1">
              <div
                className="w-full rounded-xl aspect-square"
                style={{ backgroundColor: color === "" ? "#000000" : color }}
              />
            </div>
            <Input
              defaultValue={props.team?.color ?? "#000"}
              onChange={(e) => setColor(e.target.value)}
              placeholder="#color"
              borders
              size={"sm"}
              name={"color"}
              frozen={!props.editable}
            />
          </div>

          <div className={clsx("flex flex-1 flex-col gap-4", "min-h-full")}>
            <div className={"flex flex-col gap-2"}>
              <label className="font-semibold text-dark-500">Name</label>
              <Input
                defaultValue={props.team?.name ?? ""}
                placeholder="Enter your team's name"
                borders
                size={"sm"}
                name={"name"}
                frozen={!props.editable}
              />
            </div>
            <div className={"flex flex-col gap-2"}>
              <label className="font-semibold text-dark-500">Description</label>
              <Input
                defaultValue={props.team?.description ?? ""}
                placeholder="Enter your team's description"
                borders
                size={"sm"}
                className={"flex flex-1"}
                textarea
                name={"description"}
                frozen={!props.editable}
              />
            </div>
          </div>
        </div>
        {!props.team && (
          <Button variant="accent" size="sm" rounded="full" type="submit">
            Create Team
          </Button>
        )}
      </form>
    </Container>
  );
};

export default TeamInformations;
