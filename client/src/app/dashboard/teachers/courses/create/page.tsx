"use client";
import React, { useState } from "react";
import Header from "@components/Dashboard/Common/Layout/Header";
import Container from "@components/Layout/Container";
import Input from "@components/Layout/Interactions/Forms/Input";
import Label from "@components/Layout/Interactions/Forms/Label";
import { Button } from "@components/Layout/Interactions/Button";
import FileInput from "@components/Layout/Interactions/Forms/FileInput";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { newCourse, updateCourse } from "@requests/course";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Course } from "@/types/course";

import Cards from "@icons/Cards.svg";
import clsx from "clsx";
import { toastStore } from "@components/Layout/Toast/toast.store";
import MyRadioGroup from "@/components/Layout/Interactions/Forms/RadioGroup";


const options = [
  { value: "false", label: "No" },
  { value: "true", label: "Yes" },
];

const Create = () => {
  const [isDeadline, setIsDeadline] = useState(false);

  const { data: session } = useSession();
  const token = session?.user.accessToken;
  const id = session?.user.id;

  const openToast = toastStore((state) => state.openToast);

  const [uuid, setUuid] = useState<string | null>(null);
  const [nameFile, setNameFile] = useState("");
  const [loadingPourcentage, setLoadingPourcentage] = useState<number>(0);

  const queryClient = useQueryClient();

  const router = useRouter();

  function setPourcentage(pourcentage: number) {
    setLoadingPourcentage(pourcentage);
  }
  const mutation = useMutation(
    (formData: FormData) =>
      newCourse(String(id), String(token), formData, setPourcentage),
    {
      onMutate: () => {
        setLoadingPourcentage(0);
        openToast("info", "Uploading file...");
      },
      onSuccess: async (response: {
        status: number;
        data: { uuid: string };
      }) => {
        setUuid(response.data.uuid);
        await queryClient.invalidateQueries(["courses"]);
        openToast("success", "File uploaded successfully");
      },
    }
  );

  const mutationUpdateCourse = useMutation({
    mutationFn: async (course: Course) => {
      return await updateCourse(String(token), course);
    },
    onSuccess: async () => {
      openToast("success", "Course created !");
      await queryClient.invalidateQueries(["courses"]);
      router.push("/dashboard/teachers/courses/edit/" + uuid);
    },
  });

  const handleFileSubmit = (formData: FormData) => {
    const file = formData.get("file") as File;
    setNameFile(file.name);
    mutation.mutate(formData);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const course = {
      uuid: uuid as string,
      name: formData.get("name") as string,
      subject: formData.get("subject") as string,
      description: formData.get("description") as string,
      deliveryDate: isDeadline ? formData.get("year") + "-" + formData.get("month") + "-" + formData.get("day") : "",
    };
    mutationUpdateCourse.mutate(course as Course);
  };

  const getLoadingStatus = () => {
    if (loadingPourcentage == 0) {
      return "upload";
    } else if (loadingPourcentage == 100 && uuid) {
      return "uploaded";
    } else {
      return "loading";
    }
  };

  return (
    <div>
      <Header title={"Create a new course"} />

      <div className={"flex flex-col gap-8"}>
        <Container
          title={"Course file"}
          description={"Import your course in pdf, docx or md format"}
        >
          <FileInput
            type={getLoadingStatus()}
            id={"file"}
            accept={".pdf, .doc, .docx, .md"}
            name={"course_file"}
            sendFile={handleFileSubmit}
          />

          {nameFile != "" && (
            <div className={"flex gap-2 h-fit items-center"}>
              <Cards className={"w-8"} />

              <div className="flex flex-col gap-1 flex-1">
                <span className={"font-semibold text-sm"}>{nameFile}</span>
                <div
                  style={{ width: String(loadingPourcentage) + "%" }}
                  className={clsx(
                    "h-1 rounded transition",
                    loadingPourcentage == 100 ? "bg-green-500" : "bg-accent-500"
                  )}
                />
              </div>

              <span className="w-12 text-right self-end leading-none font-medium text-dark-200">
                {loadingPourcentage}%
              </span>
            </div>
          )}
        </Container>
        <form onSubmit={handleSubmit}>
          <Container
            title={"Course informations"}
            description={"Fill the informations of your course"}
            className={clsx(!uuid && "pointer-events-none")}
          >
            <div className={clsx("flex flex-col gap-1", !uuid && "opacity-50")}>
              <Label htmlFor="name">Name</Label>
              <Input id={"name"} placeholder="Name" name="name" borders />
            </div>

            <div className={clsx("flex flex-col gap-1", !uuid && "opacity-50")}>
              <Label htmlFor="subject">Subject</Label>
              <Input
                id={"subject"}
                placeholder="Subject"
                name="subject"
                borders
              />
            </div>

            <div className={clsx("flex flex-col gap-1", !uuid && "opacity-50")}>
              <Label htmlFor="description">Description</Label>
              <Input
                id={"description"}
                placeholder="Description of the course"
                name="description"
                textarea
                borders
              />
            </div>

            <div className={clsx("flex flex-col gap-2", !uuid && "opacity-50")}>
              <MyRadioGroup
                defaultValue={options[0].value}
                options={options}
                name={"type"}
                label={"Deadline"}
                onChange={(value) => setIsDeadline(value == "true" ? true : false)}
              />
              {isDeadline && (
                <div className="flex gap-2 max-w-[400px]">
                  <Input
                    id={"day"}
                    placeholder="DD"
                    name="day"
                    borders
                  />
                  <Input
                    id={"month"}
                    placeholder="MM"
                    name="month"
                    borders
                  />
                  <Input
                    id={"year"}
                    placeholder="YYYY"
                    name="year"
                    borders
                  />

                </div>
              )
                }
            </div>


            <Button
              rounded={"full"}
              type={"submit"}
              className={`${!uuid && "opacity-50"}`}
            >
              Create this course
            </Button>
          </Container>
        </form>
      </div>
    </div>
  );
};

export default Create;
