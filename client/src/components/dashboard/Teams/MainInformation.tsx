import { Button } from "@/components/Interactions/Button";
import Input from "@/components/Interactions/Forms/Input";
import React, { FC, FormEvent, useState } from "react";
import Container from "@components/layout/Container";
import { Team } from "@/types/team";
import clsx from "clsx";

type TeamMainInformationProps = {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  team?: Team;
};

export const TeamInformations: FC<TeamMainInformationProps> = (props) => {
  const [color, setColor] = useState(props.team?.color ?? "#000000");

  return (
    <Container title={"Team informations"}>
      <form
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
              defaultValue={props.team?.color}
              onChange={(e) => setColor(e.target.value)}
              placeholder="#color"
              borders
              size={"sm"}
              name={"color"}
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
              />
            </div>
          </div>
        </div>

        <div className="flex w-full gap-4">
          <Button
            variant="accent"
            size="sm"
            rounded="full"
            type="submit"
          >
            {props.team ? "Update Team":"Create Team"}
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default TeamInformations;
