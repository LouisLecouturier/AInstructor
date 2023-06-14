"use client";
import React from "react";
import Header from "@components/dashboard/Layout/Header";
import Container from "@components/layout/Container";
import Input from "@components/Interactions/Forms/Input";
import Label from "@components/Interactions/Forms/Label";
import { Button } from "@components/Interactions/Button";
import FileInput from "@components/Interactions/Forms/FileInput";
import { useSession } from "next-auth/react";

import { newCourse } from "@/requests/courses";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const Create = () => {
  const { data: session } = useSession();
  const token = session?.user.accessToken;

  const queryClient = useQueryClient();

  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const data = new FormData(e.currentTarget);

  //   fetch("http://localhost:8000/api/course/upload", {
  //     method: "POST",
  //     headers: {
  //       Authorization: "Bearer " + session?.user.accessToken,
  //     },
  //     body: data,
  //   });
  // };


  const mutation = useMutation({
    mutationFn: (formData : FormData) => newCourse(String(token), formData),
    onSuccess: () => {
      queryClient.invalidateQueries(["teams"]);
    }
  });

  const handleFileSubmit = (formData : FormData) => {
    mutation.mutate(formData);
  }
    


  




  return (
    <div>
      <Header>Create a new course</Header>

      <div className={"flex flex-col gap-8"} >

          <Container
            title={"Course file"}
            description={"Import your course in md"}
          >
            <FileInput id={"file"} accept={".md"} name={"course_file"} sendFile={handleFileSubmit}/>
          </Container>

        <form>
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
            <Button rounded={"full"} type={"submit"}>
              Create and manage course
            </Button>
          </Container>
        </form>
      </div>
    </div>
  );
};

export default Create;
