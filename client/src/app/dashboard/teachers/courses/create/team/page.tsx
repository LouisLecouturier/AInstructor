
import { Button } from '@/components/Interactions/Button'
import Header from '@/components/dashboard/Layout/Header'
import Table from '@/components/dashboard/Table'
import Container from '@/components/layout/Container'
import React from 'react'

const teams = [
    { name: "CSI3_2022_2023" },
    { name: "CIR3_2022_2023" },
    { name: "CNB3_2022_2023" },
  ];

export default function AssignTeamToCourse({ searchParams }: { searchParams: {uuid : string} }) {
  return (
    <div>
        <Header>Create a new course</Header>

        <Container
          title={"Manage team access"}
          description={"Assign this course to your teams"}
        >
          <Table
            columns={[{ key: "name", label: "Name" }]}
            data={teams}
            ordered
            selectable
          />
          <Button size={"sm"} rounded={"full"}>
            Save access
          </Button>
        </Container>

    </div>
  )
}
