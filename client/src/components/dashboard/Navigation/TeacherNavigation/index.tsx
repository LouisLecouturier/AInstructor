import React from "react";
import NavigationElement from "@components/dashboard/Navigation/NavigationElement";

import Home from "@icons/Home.svg";
import Courses from "@icons/Cards.svg";
import Teams from "@icons/Teams.svg";
import Stats from "@icons/Stats.svg";
import Settings from "@icons/Settings.svg";

const TeacherNavigation = () => {
  return (
    <nav className={"flex flex-col gap-2"}>
      <NavigationElement
        icon={<Home />}
        label={"Home"}
        link={"/dashboard/teachers"}
      />
      <NavigationElement
        icon={<Courses />}
        label={"Courses"}
        link={"/dashboard/teachers/courses"}
      />
      <NavigationElement
        icon={<Teams />}
        label={"Teams"}
        link={"/dashboard/teachers/teams"}
      />
      <NavigationElement
        icon={<Stats />}
        label={"Stats"}
        link={"/dashboard/teachers/stats"}
      />
      <NavigationElement
        icon={<Settings />}
        label={"Settings"}
        link={"/dashboard/teachers/settings"}
      />
    </nav>
  );
};

export default TeacherNavigation;
