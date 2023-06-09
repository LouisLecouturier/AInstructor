const deleteTeam = async (teamUUID : string, userID:string, token:string) => {
    try {
      const response = await fetch("http://localhost:8000/api/group/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization : `bearer ${token}`

        },
        body: JSON.stringify({
          teamUUID,
          userID
        }),
      });
      
      const responseData = await response.json();
      console.log(responseData);
      return responseData.error;


    //   setData({
    //     name: responseData.name,
    //     users: responseData.users,
    //   });
    } 

    catch (error) {
      console.error(error);
    }
  };

  export default deleteTeam;
