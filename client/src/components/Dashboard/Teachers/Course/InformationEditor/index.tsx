import React, { FC, useRef, useState } from "react";
import { Button } from "@components/Layout/Interactions/Button";
import CheckIcon from "@icons/Checkmark.svg";
import EditIcon from "@icons/Edit.svg";
import Information from "@components/Layout/Information";
import Container from "@components/Layout/Container";
import { Course } from "@/types/course";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCourse } from "@requests/course";
import { toastStore } from "@components/Layout/Toast/toast.store";
import { useSession } from "next-auth/react";
import ContainerMessage from "@components/Layout/Container/ContainerMessage";

type CourseInformation = {
  name: string;
  subject: string;
  file: string;
  description: string;
  deliveryDate: string;
};

type InformationEditorProps = {
  uuid: string;
  data: CourseInformation;
  isLoading: boolean;
  isError: boolean;
};

const InformationEditor: FC<InformationEditorProps> = (props) => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const openToast = toastStore((state) => state.openToast);

  const mutationUpdateCourse = useMutation({
    mutationFn: async (course: Course) => {
      return await updateCourse(String(session?.user.accessToken), course);
    },
    onSuccess: async () => {
      openToast("success", "Course updated !");
      await queryClient.invalidateQueries(["course"]);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const course = {
      uuid: props.uuid as string,
      name: formData.get("name") as string,
      subject: formData.get("subject") as string,
      description: formData.get("description") as string,
      deliveryDate: formData.get("deadline") as string,
    };
    mutationUpdateCourse.mutate(course as Course);
    setIsEditing(false);
  };

  if (props.isError) {
    return (
      <Container
        title={"Course informations"}
        description={"Manage your course"}
      >
        <ContainerMessage>
          An error occurred while loading course informations
        </ContainerMessage>
      </Container>
    );
  }

  return (
    <Container
      title={"Course informations"}
      description={"Manage your course"}
      action={
        <Button
          size={"sm"}
          rounded={"full"}
          onClick={() => {
            if (isEditing && formRef.current) {
              formRef.current.submit();
              return;
            }
            setIsEditing(true);
          }}
        >
          {isEditing ? (
            <>
              <CheckIcon className={"w-4 h-4"} />
              <span>Save</span>
            </>
          ) : (
            <>
              <EditIcon className={"w-4 h-4"} />
              <span>Edit</span>
            </>
          )}
        </Button>
      }
    >
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className={"flex flex-col gap-4"}
      >
        <div className={"flex gap-4"}>
          <div className={"flex flex-col gap-2 flex-1"}>
            <Information
              label={"Name"}
              name={"name"}
              value={props.data?.name}
              isLoading={props.isLoading}
              editable={isEditing}
            />
            <Information
              label={"Description"}
              name={"description"}
              value={props.data?.description}
              isLoading={props.isLoading}
              editable={isEditing}
              isTextArea
            />
          </div>
          <div className={"flex flex-col gap-2 flex-1"}>
            <Information
              label={"Subject"}
              name={"subject"}
              value={props.data?.subject}
              isLoading={props.isLoading}
              editable={isEditing}
            />
            <Information
              label={"File uploaded"}
              name={"file"}
              value={props.data?.file.split("/").at(-1)}
              isLoading={props.isLoading}
              editable={isEditing}
            />
          </div>
          {props.data?.deliveryDate && (
            <div className={"flex flex-col gap-2 flex-1"}>
              <Information
                label={"Deadline"}
                name={"deadline"}
                value={props.data?.deliveryDate}
                isLoading={props.isLoading}
                editable={isEditing}
              />
            </div>
          )}
        </div>
      </form>
    </Container>
  );
};

export default InformationEditor;
