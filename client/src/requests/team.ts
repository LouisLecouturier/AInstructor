export const fetchTeamsUser = async (token: string) => {
  console.log("fetch");
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
      authorization: `bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};


export const deleteTeam = async (uuid : string, token:string) => {
  const response = await fetch(`http://localhost:8000/api/team/${uuid}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization : `bearer ${token}`
    },
  });

  const res = await response.json();
  return res;
};

export const createTeam = async (team : {name : string, description : string, color : string}, token: string ) => {
  const response = await fetch("http://localhost:8000/api/team/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization : `bearer ${token}`
    },
    body: JSON.stringify({team}),
  });

  const responseData = await response.json();
  return responseData;
};
