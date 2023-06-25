import React, { FC } from "react";
import Table from "@components/Dashboard/Common/Layout/Table";
import Container from "@components/Layout/Container";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCourseTeams } from "@requests/course";
import { useSession } from "next-auth/react";
import { toastStore } from "@components/Layout/Toast/toast.store";
import ContainerMessage from "@components/Layout/Container/ContainerMessage";
import Skeleton from "@components/Layout/Skeleton";

type TeamsEditorProps = {
  uuid: string;
  data: any;
  courseData: any;
  isLoading: boolean;
  isError: boolean;
};

const TeamsEditor: FC<TeamsEditorProps> = (props) => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const openToast = toastStore((state) => state.openToast);

  const mutationCourseTeams = useMutation({
    mutationFn: (teamUUID: string[]) =>
      updateCourseTeams(
        props.uuid,
        String(session?.user.accessToken),
        teamUUID
      ),
    onSuccess: () => {
      openToast("success", "Teams updated");
      return queryClient.invalidateQueries(["course", props.uuid]);
    },
  });

  const getTeamsUUID = (selected: { uuid: string }[]) => {
    const selectedUUID = selected.map((obj) => obj.uuid);
    mutationCourseTeams.mutate(selectedUUID);
  };

  if (props.isError) {
    return (
      <Container
        title={"Manage team access"}
        description={"Assign this course to your teams"}
      >
        <ContainerMessage>
          An error occurred while loading teams
        </ContainerMessage>
      </Container>
    );
  }

  if (props.isLoading || !props.courseData) {
    return (
      <Container
        title={"Manage team access"}
        description={"Assign this course to your teams"}
      >
        <Skeleton className={"w-full h-24"}/>
      </Container>
    );
  }

  return (
    <Container
      title={"Manage team access"}
      description={"Assign this course to your teams"}
    >
      <Table
        columns={[{ key: "name", label: "Name" }]}
        data={props.data}
        ordered
        selectable
        selectedRows={props.courseData.teams}
        submit={(selected) => getTeamsUUID(selected)}
        // inlineActions={false}
      />
    </Container>
  );
};

export default TeamsEditor;
