import { Button } from "@components/Interactions/Button";
import Input from "@components/Interactions/Forms/Input";
import clsx from "clsx";
import React, { useState } from "react";
import Line from "../Cards/MemberCard";
import HeaderListFieldMapping from "./TableRow/header";
import { addUserMenu } from "@/store/displayMenu";
import AddObjectModelMenu from "@components/Interactions/Forms/AddUserMenu";
import Container from "@components/layout/Container";

interface user {
  first_name: string;
  last_name: string;
  email: string;
  is_teacher: boolean;
}

export default function ListFieldMapping({
  users,
  modelPrimaryKey,
  modelFieldList,
  nameField,
  urlDeleteLine,
  urlAddLine,
  placeholderPrimaryKeyElementAdd,
}: {
  users: user[];
  modelPrimaryKey: string;
  modelFieldList: Record<string, string | boolean>[];
  nameField: string;
  urlDeleteLine: string;
  urlAddLine: string;
  placeholderPrimaryKeyElementAdd: string;
}) {
  const isAddUserMenuDisplayed = addUserMenu((state) => state.isDisplay);


  return (
    <table>

    </table>
  )



  return (
    <Container title={"Members"}>
      <div className="flex flex flex-col">
        <div className="flex h-full w-full rounded-b-xl overflow-auto flex-col">
          {modelFieldList.map(
            (modelFieldLine: Record<string, string | boolean>, i: number) => (
              <Line
                key={i}
                modelPrimaryKey={modelPrimaryKey}
                modelFieldLine={modelFieldLine}
                urlDeleteLine={urlDeleteLine}
              />
            )
          )}
        </div>
      </div>
    </Container>
  );





}
