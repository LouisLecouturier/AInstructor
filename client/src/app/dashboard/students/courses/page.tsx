import React from "react";
import ListItem from "@components/layout/ListItem";

const properties = [
  {
    label: "Nico",
    value: "Je t'aime",
  },
  {
    label: "Mael",
    value: "Aussi",
  },
  {
    label: "Antoine",
    value: "aussi",
  },
];

const MyCourses = () => {
  return (
    <div>
      <h1 className={"flex items-center h-16 text-4xl font-black"}>
        My courses
      </h1>
      <div>
          <ListItem properties={properties} withUserActions>
              Hello
          </ListItem>
      </div>
    </div>
  );
};

export default MyCourses;
