import { Team } from "@/types/team";

export const fetchTeamsUser = async (token: string) => {
  const response = await fetch("http://127.0.0.1:8000/api/team/", {
    headers: {
      authorization: `bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  return data.teams;
};

export const fetchTeam = async (token: string, uuid: string) => {
  const response = await fetch(`http://localhost:8000/api/team/${uuid}`, {
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};

export const deleteTeam = async (uuid: string, token: string) => {
  const response = await fetch(`http://localhost:8000/api/team/${uuid}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });

  return await response.json();
};

export const createTeam = async (
  team: { name: string; description: string; color: string },
  token: string
) => {
  const response = await fetch("http://localhost:8000/api/team/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `bearer ${token}`,
    },
    body: JSON.stringify({
      name: team.name,
      description: team.description,
      color: team.color,
    }),
  });

  const responseData = await response.json();
  return responseData;
};

export const addUsers = async (
  uuid: string,
  emails: string[],
  token: string
) => {
  const response = await fetch(
    `http://localhost:8000/api/team/${uuid}/add-users`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${token}`,
      },
      body: JSON.stringify({ emails : emails }),
    }
  );

  const responseData = await response.json();
  return responseData;
};

export const removeUsers = async (
  uuid: string,
  emails: string[],
  token: string
) => {
  const response = await fetch(
    `http://localhost:8000/api/team/${uuid}/remove-users`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${token}`,
      },
      body: JSON.stringify({ emails: emails }),
    }
  );
  const responseData = await response.json();
  return responseData;
};

export const updateTeam = async (
  uuid: string,
  team: Omit<Team, "users" | "uuid">,
  token: string
) => {
  const response = await fetch(`http://localhost:8000/api/team/${uuid}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `bearer ${token}`,
    },
    body: JSON.stringify({
      name: team.name,
      description: team.description,
      color: team.color,
    }),
  });

  const responseData = await response.json();
  return responseData;

}


export const getCoursesTeam = async (uuid : string, token: string ) => {
  const response = await fetch(`http://localhost:8000/api/team/${uuid}/courses`, {
    headers: {
      "Content-Type": "application/json",
      authorization : `bearer ${token}`
    },
  });

  const responseData = await response.json();
  return responseData;
}

