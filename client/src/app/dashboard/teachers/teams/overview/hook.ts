const getTeamInformation = async (
  teamUUID: string,
  userID: string,
  token: string
) => {
  try {
    const response = await fetch("http://localhost:8000/api/group/overview", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${token}`,
      },
      body: JSON.stringify({
        teamUUID,
        userID,
      }),
    });

    return await response.json();

    //   setData({
    //     name: responseData.name,
    //     users: responseData.users,
    //   });
  } catch (error) {
    console.error(error);
  }
};

export default getTeamInformation;
