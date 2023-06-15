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

const columns = [
  { key: "id", label: "Id" },
  { key: "name", label: "Name" },
  { key: "surname", label: "Surname" },
  { key: "sex", label: "Sexe" },
];

const TableData = [
  {
    id: 1,
    name: "Louis",
    surname: "Bouchez",
    sex: "15cm",
  },
  {
    id: 2,
    name: "Alexandre",
    surname: "Bouchez",
    sex: "13cm",
  },
  {
    id: 3,
    name: "Pierre",
    surname: "Bouchez",
    sex: "12cm",
  },
];

export default function Dashboard() {
  const { data: session } = useSession();

  return (
    <>
      <Header>Dashboard</Header>
      <div className="flex flex-col gap-4 my-20px">
        <Container>
          <Table columns={columns} data={TableData} firstIsKey />
        </Container>
      </div>
    </>
  );
}
