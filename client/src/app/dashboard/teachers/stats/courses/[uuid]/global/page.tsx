"use client";

import { Bar } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import { Chart as ChartJS } from "chart.js/auto";
import { getCourseStatsGlobal } from "@/requests/stats";
import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Header from "@/components/Dashboard/Common/Layout/Header";
import Container from "@/components/Layout/Container";
import { getCourse } from "@requests/course";

const mean = {
  labels: [],
  datasets: [
    {
      label: "",
      data: [],
      backgroundColor: [
        "rgba(255, 99, 132, 0.7)",
        "rgba(255, 159, 64, 0.7)",
        "rgba(255, 205, 86, 0.7)",
        "rgba(75, 192, 192, 0.7)",
        "rgba(54, 162, 235, 0.7)",
        "rgba(153, 102, 255, 0.7)",
        "rgba(201, 203, 207, 0.7)",
        "rgba(255, 99, 132, 0.7)",
        "rgba(255, 159, 64, 0.7)",
        "rgba(255, 205, 86, 0.7)",
        "rgba(75, 192, 192, 0.7)",
        "rgba(54, 162, 235, 0.7)",
      ],
    },
  ],
};

const min = {
  labels: [],
  datasets: [
    {
      label: "",
      data: [],
      backgroundColor: [
        "rgba(255, 99, 132, 0.7)",
        "rgba(255, 159, 64, 0.7)",
        "rgba(255, 205, 86, 0.7)",
        "rgba(75, 192, 192, 0.7)",
        "rgba(54, 162, 235, 0.7)",
        "rgba(153, 102, 255, 0.7)",
        "rgba(201, 203, 207, 0.7)",
        "rgba(255, 99, 132, 0.7)",
        "rgba(255, 159, 64, 0.7)",
        "rgba(255, 205, 86, 0.7)",
        "rgba(75, 192, 192, 0.7)",
        "rgba(54, 162, 235, 0.7)",
      ],
    },
  ],
};

const max = {
  labels: [],
  datasets: [
    {
      label: "",
      data: [],
      backgroundColor: [
        "rgba(255, 99, 132, 0.7)",
        "rgba(255, 159, 64, 0.7)",
        "rgba(255, 205, 86, 0.7)",
        "rgba(75, 192, 192, 0.7)",
        "rgba(54, 162, 235, 0.7)",
        "rgba(153, 102, 255, 0.7)",
        "rgba(201, 203, 207, 0.7)",
        "rgba(255, 99, 132, 0.7)",
        "rgba(255, 159, 64, 0.7)",
        "rgba(255, 205, 86, 0.7)",
        "rgba(75, 192, 192, 0.7)",
        "rgba(54, 162, 235, 0.7)",
      ],
    },
  ],
};

const options = {
  maintainAspectRatio: false,
};

ChartJS.register(CategoryScale);

const TeamStats = () => {
  const { data: session } = useSession();
  const token = session?.user?.accessToken;

  const pathname = usePathname();

  const uuid = (pathname ?? "").split("/");
  const courseUUID = uuid[uuid.length - 2];

  console.log(courseUUID);

  const {
    data: stats,
    isLoading,
    isError,
  } = useQuery<any>({
    queryKey: ["course", uuid, "stats"],
    queryFn: () => getCourseStatsGlobal(String(courseUUID), String(token)),
    enabled: !!token && !!courseUUID && !!uuid,
  });

  const {
    data: course,
    isError: isCourseError,
    isLoading: isCourseLoading,
  } = useQuery(["course", uuid], {
    queryFn: () => getCourse(String(courseUUID), String(token)),
    enabled: !!token && !!courseUUID,
  });

  if (isLoading || isError || isCourseError || isCourseLoading)
    return <div>Loading...</div>;
  console.log(stats);

  mean.datasets[0].data = stats.teamsStats.map((e: any) => e.mean);
  mean.datasets[0].label = "Mean";
  mean.labels = stats.teamsStats.map((e: any) => e.team.name);

  min.datasets[0].data = stats.teamsStats.map((e: any) => e.min);
  min.datasets[0].label = "Min";
  min.labels = stats.teamsStats.map((e: any) => e.team.name);

  max.datasets[0].data = stats.teamsStats.map((e: any) => e.max);
  max.datasets[0].label = "Max";
  max.labels = stats.teamsStats.map((e: any) => e.team.name);

  return (
    <div className="flex flex-col gap-10">
      <Header
        title="Stats"
        breadcrumbsReplace={[
          { current: String(courseUUID), value: course.name },
        ]}
      />

      <Container
        title="Mean"
        description="represents the mean of each team"
        className="w-full border-2 border-white hover:border-accent-300 transition"
      >
        <div className=" w-full min-h-[400px] max-h-[400px]  flex justify-center items-center">
          <Bar data={mean} options={options} />
        </div>
      </Container>

      <Container
        title="Min"
        description="represents the min of each team"
        className="w-full border-2 border-white hover:border-accent-300 transition"
      >
        <div className=" w-full min-h-[400px] max-h-[400px]  flex justify-center items-center">
          <Bar data={min} options={options} />
        </div>
      </Container>

      <Container
        title="Max"
        description="represents the max of each team"
        className="w-full border-2 border-white hover:border-accent-300 transition"
      >
        <div className=" w-full min-h-[400px] max-h-[400px]  flex justify-center items-center">
          <Bar data={max} options={options} />
        </div>
      </Container>
    </div>
  );
};

export default TeamStats;
