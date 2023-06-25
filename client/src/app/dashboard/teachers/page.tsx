"use client";

import Table from "@components/Dashboard/Common/Layout/Table";
import Header from "@components/Dashboard/Common/Layout/Header";
import Container from "@components/Layout/Container";
import { useSession } from "next-auth/react";
import { Course } from "@/types/course";
import { useQuery } from "@tanstack/react-query";
import { getCourses } from "@/requests/course";
import { Button } from "@/components/Layout/Interactions/Button";
import { nanoid } from "nanoid";
import CubeTeams from "@/components/Dashboard/Teachers/Stats";
import { use } from "react";
import { useRouter } from "next/navigation";

const columns = [
  { key: "id", label: "Id" },
  { key: "name", label: "Name" },
  { key: "surname", label: "Surname" },
];

const TableData = [
  {
    id: 1,
    name: "Louis",
    surname: "Bouchez",
  },
  {
    id: 2,
    name: "Alexandre",
    surname: "Bouchez",
  },
  {
    id: 3,
    name: "Pierre",
    surname: "Bouchez",
  },
];

export default function Dashboard() {
  const {data : session} = useSession();
  const firstname = session?.user.first_name;
  const token = session?.user.accessToken;
  const id = session?.user.id;

  const router = useRouter();


  const { data : courses, isLoading : isCoursesLoading, isError : isCoursesError } = useQuery<Course[]>(["courses"], {
    queryFn: () => getCourses(String(token), String(id)),
    enabled: ![token, id].includes(undefined),
  });

  if (isCoursesLoading || isCoursesError) return <div>Loading...</div>;

  console.log(courses);

  return (
    <>
      <Header title={"Dashboard"}/>
      <div className="flex-col flex gap-8">
        <h1 className="text-3xl font-bold">
          Welcome back to work {firstname} !
        </h1>
        {courses.map((course) => (
          <Container key={nanoid()} title={course.name} description={course.subject}>
            <Button rounded={"full"} size="sm" onClick={() =>router.push(`/dashboard/teachers/courses/edit/${course.uuid}`)}>
              View course
            </Button>
            <Container title="Teams" className="border-2 border-solid border-accent-100" description="all the teams assigned to this course">
              <div className="flex gap-4 flex-wrap w-full">
              {course.teams.map((team) => (
                <CubeTeams
                  uuid={team.uuid}
                  key={nanoid()}
                  color={team.color}
                  name={team.name}
                  href={`/dashboard/teachers/teams/overview/${team.uuid}`}
                  message={"View team"}
              />

                
                ))}
                </div>
            </Container>


          </Container>
        ))}
       
        
      </div>
     
    </>
  );
}