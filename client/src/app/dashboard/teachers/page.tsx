"use client";

import { useSession } from "next-auth/react";
import Header from "@components/Dashboard/Layout/Header";
import Container from "@components/Layout/Container";
import Table from "@components/Dashboard/Layout/Table";

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
      <Header title={"Dashboard"}/>
      <div className="flex flex-col gap-4 my-20px">
        <Container>
          <Table columns={columns} data={TableData} firstIsKey />
        </Container>
      </div>
    </>
  );
}