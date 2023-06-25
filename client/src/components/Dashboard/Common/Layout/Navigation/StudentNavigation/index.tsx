import React from "react";
import NavigationElement from "@components/Dashboard/Common/Layout/Navigation/NavigationElement";

import Home from "@icons/Home.svg";
import Courses from "@icons/Cards.svg";
import Teams from "@icons/Teams.svg";
import Settings from "@icons/Settings.svg";

const StudentNavigation = () => {
  return (
    <nav className={"flex flex-col gap-2"}>
      <NavigationElement
        icon={<Home />}
        label={"Home"}
        link={"/dashboard/students"}
      />
      <NavigationElement
        icon={<Courses />}
        label={"My courses"}
        link={"/dashboard/students/courses"}
      />
      <NavigationElement
        icon={<Teams />}
        label={"My teams"}
        link={"/dashboard/students/teams"}
      />
      {/* <NavigationElement
        icon={<Stats />}
        label={"My stats"}
        link={"/dashboard/students/stats"}
      /> */}
      <NavigationElement
        icon={<Settings />}
        label={"Settings"}
        link={"/dashboard/students/settings"}
      />
    </nav>
  );
};

export default StudentNavigation;
