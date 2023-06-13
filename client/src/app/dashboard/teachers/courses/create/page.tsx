import React from "react";
import Header from "@components/dashboard/Layout/Header";
import Container from "@components/layout/Container";
import Input from "@components/Interactions/Forms/Input";
import Label from "@components/Interactions/Forms/Label";
import { Button } from "@components/Interactions/Button";
import FileInput from "@components/Interactions/Forms/FileInput";

const Create = () => {
  return (
    <div>
      <Header>Create a new course</Header>

      <form className={"flex flex-col gap-8"}>
        <Container
          title={"Course file"}
          description={"Import your course in md"}
        >
          <FileInput id={"file"} accept={".md"} name={"file"} />
        </Container>
        <Container title={"Course informations"}>
          <div className={"flex flex-col gap-1"}>
            <Label htmlFor="name">Name</Label>
            <Input id={"name"} placeholder="Name" name="name" borders />
          </div>
          <div className={"flex flex-col gap-1"}>
            <Label htmlFor="subject">Subject</Label>
            <Input id={"subject"} placeholder="Subject" name="theme" borders />
          </div>
          <div className={"flex flex-col gap-1"}>
            <Label htmlFor="description">Description</Label>
            <Input
              id={"description"}
              placeholder="Description of the course"
              name="description"
              textarea
              borders
            />
          </div>
          <Button rounded={"full"} type={"submit"}>Create and manage course</Button>
        </Container>
      </form>
    </div>
  );
};

export default Create;
