"use client";

import { Bar, Doughnut } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import { Chart as ChartJS } from "chart.js/auto";
import { getCourseStats } from "@/requests/stats";
import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Header from "@/components/Dashboard/Common/Layout/Header";
import Container from "@/components/Layout/Container";
import { fetchTeam } from "@/requests/team";
import { getCourse } from "@/requests/course";

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

const progress = {
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


const data2 = {
  labels: [
    "Elève 1",
    "Elève 2",
    "Elève 3",
    "Elève 4",
    "Elève 5",
    "Elève 6",
    "Elève 7",
    "Elève 8",
    "Elève 9",
    "Elève 10",
    "Elève 11",
    "Elève 12",
  ],
  datasets: [
    {
      label: "Score élèves",
      /* IQ */
      data: [12, 19, 3, 5, 2, 3, 15, 3, 5, 2, 3, 15],
      backgroundColor: [
        "rgb(255, 99, 132)",
        "rgb(54, 162, 235)",
        "rgb(255, 205, 86)",
        "rgb(75, 192, 192)",
        "rgb(153, 102, 255)",
        "rgb(255, 159, 64)",
        "rgb(201, 203, 207)",
        "rgb(255, 99, 132)",
        "rgb(54, 162, 235)",
        "rgb(255, 205, 86)",
        "rgb(75, 192, 192)",
        "rgb(153, 102, 255)",
      ],
      hoverOffset: 4,
    },
  ],
};

const options = {
  maintainAspectRatio: false,
};


ChartJS.register(CategoryScale);

const teamStats = () => {
  const {data : session} = useSession();
  const token = session?.user?.accessToken;

  const pathname = usePathname();
  
  const uuid = (pathname ?? "").split("/");
  const courseUUID = uuid[uuid.length - 2];
  const teamUUID = uuid[uuid.length - 1];



  const { data : stats, isLoading, isError } = useQuery<any>({
    queryKey: ["team", uuid , "stats"],
    queryFn: () => getCourseStats(String(teamUUID), String(courseUUID), String(token)),
    enabled: !!token && !!teamUUID && !!courseUUID && !!uuid,
  });



  const { data : team, isError : isTeamError, isLoading : isTeamLoading} = useQuery(["team", uuid], {
    queryFn: () => fetchTeam(String(token), String(teamUUID)),
    enabled: !!token && !!teamUUID,
});

  const {data : course,isError: isCourseError , isLoading : isCourseLoading} = useQuery(["course", uuid], {
    queryFn: () => getCourse(String(courseUUID), String(token)),
    enabled: !!token && !!courseUUID,
  });

  if (isLoading || isError || isCourseError || isCourseLoading || isTeamError || isTeamLoading) return <div>Loading...</div>;


  mean.datasets[0].data = stats.usersStats.map((e : any) => e.stats.mean);
  mean.datasets[0].label = "Mean";
  mean.labels = stats.usersStats.map((e : any) => e.user.firstName + " " + e.user.lastName);

  min.datasets[0].data = stats.usersStats.map((e : any) => e.stats.min);
  min.datasets[0].label = "Min";
  min.labels = stats.usersStats.map((e : any) => e.user.firstName + " " + e.user.lastName);

  max.datasets[0].data = stats.usersStats.map((e : any) => e.stats.max);
  max.datasets[0].label = "Max";
  max.labels = stats.usersStats.map((e : any) => e.user.firstName + " " + e.user.lastName);

  progress.datasets[0].data = stats.usersStats.map((e : any) => e.stats.progress);
  progress.datasets[0].label = "Progress";
  progress.labels = stats.usersStats.map((e : any) => e.user.firstName + " " + e.user.lastName);

  return (
    <div className="flex flex-col gap-10">
      <Header title="Stats" breadcrumbsReplace={[{current : String(teamUUID), value : team.name},{current: String(courseUUID), value : course.name}]} />
        {!stats.error 

        ?  <div className="flex flex-col flex-1 gap-10 items-center">
              <Container title="Mean" description="represents the mean of each student" className="w-full border-2 border-white hover:border-accent-300 transition">
                <div className=" w-full min-h-[400px] max-h-[400px]  flex justify-center items-center">
                  <Bar data={mean} options={options} />
                </div>
              </Container>
              <Container title="Minimum score" description="represents the minimum score of each student" className="w-full border-2 border-white hover:border-accent-300 transition">
                <div className=" w-full min-h-[400px] max-h-[400px] flex justify-center items-center">
                  <Bar data={min} options={options} />
                </div>
              </Container>
              <Container title="Maximum score" description="represents the maximum score of each student" className="w-full border-2 border-white hover:border-accent-300 transition">
                <div className=" w-full min-h-[400px] max-h-[400px] flex justify-center items-center">
                  <Bar data={max} options={options} />
                </div>
              </Container>
              <Container title="Total progress" description="represents the total progress of each student" className="w-full border-2 border-white hover:border-accent-300 transition">
                <div className=" w-full min-h-[400px] max-h-[400px] flex justify-center items-center">
                  <Bar data={progress} options={options} />
                </div>
              </Container>
             
              {/* <Container className=" w-full min-h-[400px] max-h-[400px] border-2 border-white hover:border-accent-300 transition flex justify-center items-center">
                <Doughnut data={data2} />
              </Container> */}
          </div>

        : <div className="flex flex-1">
            <div className="text-xl font-bold text-secondary-500">
              {stats.message}
            </div>
          </div>
        }
    </div>
  );
};

export default teamStats;