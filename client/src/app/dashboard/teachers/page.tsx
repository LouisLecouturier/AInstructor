"use client";

import { useSession } from "next-auth/react";
import Header from "@components/dashboard/Layout/Header";
import Container from "@components/layout/Container";
import Table from "@components/dashboard/Table";

const questions = [
  {
    id: 1,
    question: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
  {
    id: 2,
    question: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
  {
    id: 3,
    question: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
];

const columns = ["Id", "Name", "Surname", "Sexe"];

const TableData = [
  {
    id: 1,
    name: "Louis",
    surname: "Bouchez",
    sexe: "15cm"
  },
  {
    id: 2,
    name: "Alexandre",
    surname: "Bouchez",
    sexe: "13cm"
  },
  {
    id: 3,
    name: "Pierre",
    surname: "Bouchez",
    sexe: "12cm"
  },
];

export default function Dashboard() {
  const { data: session } = useSession();
  console.log({ session });


export default function Dashboard() {

  return (
    <>
      <Header>Dashboard</Header>
      <div className="flex flex-col gap-4 my-20px">
        <Container>
          <Table columns={columns} data={TableData} firstIsKey/>
        </Container>
      </div>
    </>
  );
}
