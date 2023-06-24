// import React from "react";
// import CubeCourses from "@components/Dashboard/Students/Stats";
// import Link from "next/link";
// import Header from "@components/Dashboard/Common/Layout/Header";
// import Container from "@components/Layout/Container";

// const courses = [
//   {
//     id: 1,
//     course: "ASN",
//     score: 12,
//     moy: 50,
//   },
//   {
//     id: 2,
//     course: "Meca Q",
//     score: 52,
//     moy: 32,
//   },
//   {
//     id: 3,
//     course: "Electronique",
//     score: 69,
//     moy: 10,
//   },
//   {
//     id: 4,
//     course: "Physique",
//     score: 100,
//     moy: 80,
//   },
// ];

// const Stats = () => {
//   return (
//     <>
//       <Header title={"My stats"} />
//       <div className="flex flex-col gap-5">
//         <div className="flex flex-col gap-20">
//           <Container title={"Your stats by courses"}>
//             <div className={"flex gap-4 flex-wrap"}>
//               {courses.map((course) => (
//                 <CubeCourses
//                   uuid={course.id}
//                   key={course.course}
//                   course={course.course}
//                 />
//               ))}
//             </div>
//             <Link
//               className="rounded-xl w-1/3 h-15 "
//               href={`/dashboard/students/stats/courses/mystats`}
//             >
//               <div className="flex flex-col gap-5 p-4 py-3 bg-white rounded-xl font-bold text-accent-500 text-xl text-center border-2 border-dark-50 hover:border-accent-300 transition">
//                 Accéder à toutes mes stats
//               </div>
//             </Link>
//           </Container>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Stats;


"use client";
import React from "react";
import ListItem from "@components/Layout/ListItem";

import Header from "@components/Dashboard/Common/Layout/Header";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { fetchCourses } from "@requests/course";
import Container from "@components/Layout/Container";
import { nanoid } from "nanoid";

type Course = {
  uuid: string;
  name: string;
  creationDate: string;
  deliveryDate: string;
  team: string;
  status: "pending" | "in-progress" | "done";
};

const MyCourses = () => {
  const { data: session } = useSession();
  const token = session?.user.accessToken;
  const id = session?.user.id;

  const { data, isLoading, isError } = useQuery<Course[]>({
    queryKey: ["courses", id],
    queryFn: () => fetchCourses(String(token), String(id)),
    enabled: (token || id) !== undefined,
  });

  if (isLoading || isError) {
    return <div>Loading...</div>;
  }



  // Group courses by team
  const sections = data.reduce((acc, course) => {
    const team = course.team;


    if (acc.has(team)) {
      acc.get(team).push(course);
    } else {
      acc.set(team, [course]);
    }

    return acc;
  }, new Map());

  return (
    <div>
      <Header title={"My courses"} />

      <main>
        <Container title={"Choose a course"} description={"Courses ordered by teams"}>
        <div className={"flex flex-col gap-6"}>
          {Array.from(sections).map(([team, courses]) => {
            return (
              <Container title={team} key={nanoid()}>
                {courses.map((course: any) => {
                  console.log(course.team);
                  const properties = [
                    { label: "Creation date", value: course.creationDate },
                    // { label: "Delivery date", value: course.deliveryDate },
                    { label: "Team", value: course.team },
                  ];

                  return (
                    <ListItem
                      href={`/dashboard/students/courses/${course.uuid}`}
                      status={course.status}
                      key={course.name}
                      properties={properties}
                    >
                      {course.name}
                    </ListItem>
                  );
                })}
              </Container>
            );
          })}
        </div>
        </Container>
      </main>
    </div>
  );
};

export default MyCourses;
