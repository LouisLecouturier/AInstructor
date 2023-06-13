import React from "react";
import Link from "next/link";

type Course = {
  uuid?: number;
  index?: number;
  course?: string;
  progress?: number;
  //   image: string;
};

export default function CubeCourses(props: Course) {
  return (
    <Link href={`/dashboard/students/stats/courses/${props.uuid}`}>
      <div className="flex flex-col gap-5 p-4 py-3 w-64 h-64 bg-white rounded-xl">
        <div className="flex bg-dark-50 rounded-md h-40 w-full"></div>
        <h3 className="font-semibold">Cours : {props.course}</h3>
        <h2 className="text-accent-500 text-md font-bold">Voir les stats</h2>
      </div>
    </Link>
  );
}
