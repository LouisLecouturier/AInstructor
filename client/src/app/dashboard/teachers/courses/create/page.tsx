"use client";
import React, { use, useState } from "react";
import Header from "@components/dashboard/Layout/Header";
import Container from "@components/layout/Container";
import Input from "@components/Interactions/Forms/Input";
import Label from "@components/Interactions/Forms/Label";
import { Button } from "@components/Interactions/Button";
import FileInput from "@components/Interactions/Forms/FileInput";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { newCourse, updateCourse } from "@/requests/courses";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Course } from "@/types/team";

import Cards from "@icons/Cards.svg"



const Create = () => {
  const { data: session } = useSession();
  const token = session?.user.accessToken;
  const id = session?.user.id;

  const [uuid , setUUID] = useState<string | null>(null);
  const [nameFile, setNameFile] = useState("");
  const [loadingPourcentage, setLoadingPourcentage] = useState<number>(0);
  
  const queryClient = useQueryClient();

  const router = useRouter();
  
  function setPourcentage(pourcentage : number){
    setLoadingPourcentage(pourcentage);
    
  
  }
  const mutation = useMutation((formData: FormData) => newCourse(String(id), String(token), formData, setPourcentage), {
    onSuccess: (response: { status: number; data: { uuid: string } }) => {
      setUUID(response.data.uuid);
      queryClient.invalidateQueries(["courses"]);
    },
  });
  
  


  const mutationUpdateCourse = useMutation({
    mutationFn: (course : Course ) => updateCourse(String(token), course),
    onSuccess: () => {
      queryClient.invalidateQueries(["courses"]);
      router.push("/dashboard/teachers/courses/create/team?uuid="+uuid)
    }
  })


  const handleFileSubmit = (formData : FormData) => {
    const file = formData.get("file") as File;
    setNameFile(file.name);
    mutation.mutate(formData);
  }
    
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
      const course = {
        uuid: uuid as string,
        name: formData.get("name") as string,
        subject: formData.get("subject") as string,
        description: formData.get("description") as string,
      };
      mutationUpdateCourse.mutate(course as Course);
  }


  




  return (
    <div>
      <Header>Create a new course</Header>

      <div className={"flex flex-col gap-8"} >

          <Container
            title={"Course file"}
            description={"Import your course in md"}
            className="max-w-5xl"
          >
          { nameFile == "" && uuid == null && loadingPourcentage == 0 &&
            <FileInput type="upload" id={"file"} accept={".pdf"} name={"course_file"} sendFile={handleFileSubmit}/>
          }
          { nameFile != "" && uuid == null &&
            <FileInput type="loading" id={"file"} accept={".pdf"} name={"course_file"} sendFile={handleFileSubmit}/>
          }
          { nameFile != "" && uuid != null && loadingPourcentage == 100 &&
            <FileInput type="uploaded" id={"file"} accept={".pdf"} name={"course_file"} sendFile={handleFileSubmit}/>
          }

          {nameFile != "" &&
            <div className={"flex gap-2 items-center"}>
              <Cards className={"w-8"}/>

              <div className="flex flex-col gap-1 flex-1">
                <span>{nameFile}</span>
                <div style={{"width" : String(loadingPourcentage)+"%" }} className={" h-1 bg-accent-500 rounded"}/>
              </div>

              <span className="w-12 text-right">{loadingPourcentage}%</span>
            </div>
          }
          </Container>

          {uuid != null &&
          <form onSubmit={handleSubmit}>
                <Container 
                  title={"Course informations"}
                  className='max-w-5xl'
                >
                    
                    <div className={"flex flex-col gap-1"}>
                        <Label htmlFor="name">Name</Label>
                        <Input id={"name"} placeholder="Name" name="name" borders />
                    </div>

                    <div className={"flex flex-col gap-1"}>
                        <Label htmlFor="subject">Subject</Label>
                        <Input id={"subject"} placeholder="Subject" name="subject" borders />
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
                        Confirm
                    </Button>

                </Container>
            </form>
            }

        
      </div>
    </div>
  );
};

export default Create;

