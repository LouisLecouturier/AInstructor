
const newTeam = async (name: string, description: string, color: string, token: string ) => {
      const response = await fetch("http://localhost:8000/api/team/", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          authorization : `bearer ${token}`
        },

        body: JSON.stringify({
          name,
          description,
          color,
        }),

      });
  
      const responseData = await response.json();
      console.log(responseData.error);
      return responseData.error;
  };

  export default newTeam;