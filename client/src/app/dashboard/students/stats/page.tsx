import React from "react";
import CubeCourses from "@/components/dashboard/Students/Stats";
import Link from "next/link";
import Header from "@/components/dashboard/Layout/Header";

const courses = [
  {
    id: 1,
    course: "ASN",
    score: 12,
    moy: 50,
  },
  {
    id: 2,
    course: "Meca Q",
    score: 52,
    moy: 32,
  },
  {
    id: 3,
    course: "Electronique",
    score: 69,
    moy: 10,
  },
  {
    id: 4,
    course: "Physique",
    score: 100,
    moy: 80,
  },
];

const Stats = () => {
  return (
    <div className="flex flex-col gap-5">
      <Header>Stats</Header>
      <div className="flex flex-col gap-20">
        <div className="flex gap-8 ">
          {courses.map((course) => (
            <CubeCourses
              uuid={course.id}
              key={course.course}
              course={course.course}
            />
          ))}
        </div>
        <Link
          className="rounded-xl w-1/3 h-15 "
          href={`/dashboard/students/stats/courses/mystats`}
        >
          <div className="flex flex-col gap-5 p-4 py-3 bg-white rounded-xl font-bold text-accent-500 text-xl text-center border-2 border-dark-50 hover:border-accent-300 transition">
            Accéder à toutes mes stats
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Stats;
