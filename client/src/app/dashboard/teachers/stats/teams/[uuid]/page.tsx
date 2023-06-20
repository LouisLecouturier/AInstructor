"use client";
import Header from '@/components/dashboard/Layout/Header';
import Container from '@/components/layout/Container';
import ListItem from '@/components/layout/ListItem';
import { getCourses } from '@/requests/course';
import { Course } from '@/types/course';
import { useQuery } from '@tanstack/react-query';
import { nanoid } from 'nanoid';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import React from 'react'

export default function CourseList() {
    const { data: session } = useSession();
    const pathname = usePathname();
    const token = session?.user.accessToken;
    const id = session?.user.id;
    
    const { data, isLoading, isError } = useQuery<Course[]>(["courses"], {
        queryFn: () => getCourses(String(token), String(id)),
        enabled: !!token && !!id,
      });

      
    
      if (isLoading || isError) {
        return <div>loading...</div>;
      }

    return (
        <>
            <Header title={"Choose a course"} />

            <Container
                title={"Your courses"}
                description={"Preview, manage, delete your courses"}
            >
        <div className={"flex flex-col gap-2"}>
          {data.length > 0 ? (
            data.map((course) => {
              const properties = [
                { label: "Creation date", value: course.creationDate },
                { label: "Delivery date", value: course.deliveryDate },
                { label: "Team", value: course.team },
              ];

              return (
                <ListItem
                  key={nanoid()}
                  properties={properties}  
                  href={`${pathname}/${course.uuid}`}               
                >
                  {course.name}
                </ListItem>
              );
            })
          ) : (
            <span>You don&apos;t have any course yet</span>
          )}
        </div>
      </Container>
      </>
    )
}
