const deleteTeam = async (uuid : string, token:string) => {
      const response = await fetch(`http://localhost:8000/api/team/${uuid}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization : `bearer ${token}`
        },
      });
      
      const res = await response.json();
      console.log(response);
      return res.error;
 
  };

  export default deleteTeam;
