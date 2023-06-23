"use client";

import Table from "@components/Dashboard/Common/Layout/Table";
import Header from "@components/Dashboard/Common/Layout/Header";
import Container from "@components/Layout/Container";

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