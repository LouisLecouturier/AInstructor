import React from "react";
import Input from "../Input";
import { Button } from "../../Button";
import { addUserMenu } from "@/store/displayMenu";
import { useSession } from "next-auth/react";

const AddLine = async (
  PrimaryKeyElementAdd: string,
  modelPrimaryKey: string,
  urlAddLine: string,
  token: string
) => {
  try {
    const response = await fetch(urlAddLine, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${token}`,
      },
      body: JSON.stringify({
        modelPrimaryKey,
        PrimaryKeyElementAdd,
      }),
    });

    const responseData = await response.json();
    console.log(responseData.error);
    return responseData.error;
  } catch (error) {
    console.error(error);
  }
};

export default function AddObjectModelMenu({
  modelPrimaryKey,
  urlAddLine,
  placeholder,
  nameField,
}: {
  modelPrimaryKey: string;
  urlAddLine: string;
  placeholder: string;
  nameField: string;
}) {
  const [isError, setIsError] = React.useState(false);

  const setDisplay = addUserMenu(state => state.setDisplay)
  
  const {data : session} = useSession()
  const token = String(session?.user["accessToken"])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const PrimaryKeyElementAdd = formData.get("PrimaryKeyElementAdd") as string;

    const error = await AddLine(
      PrimaryKeyElementAdd,
      modelPrimaryKey,
      urlAddLine,
      token
    );

    if (error == false) {
      setDisplay(false);
    }
    setIsError(error);
  };

  return (
    <form
      className="h-full w-full justify-between flex flex-col p-12"
      onSubmit={handleSubmit}
    >
      <div className="w-full">
        <h2 className="text-2xl font-bold">Add new {nameField}</h2>
      </div>

      <div className="flex flex-col w-full gap-2">
        <span className="text-lg font-bold">Enter {placeholder}</span>
        <Input
          placeholder={placeholder}
          name={"PrimaryKeyElementAdd"}
          borders
        />
        {isError && <span className="text-red-500">Error</span>}
      </div>

      <div className="flex">
        <Button type="submit">Save</Button>
        <Button size="sm" onClick={() => setDisplay(false)} variant="tertiary">
          Cancel
        </Button>
      </div>
    </form>
  );
}
