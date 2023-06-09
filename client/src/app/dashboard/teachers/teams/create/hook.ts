
const newTeam = async (name: string, description: string, color: string, id: string, token: string ) => {

    try {

      const response = await fetch("http://127.0.0.1:8000/api/team/new", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          authorization : `bearer ${token}`
        },

        body: JSON.stringify({
          name,
          description,
          color,
          userID: id,
        }),

      });
  
      const responseData = await response.json();
      console.log(responseData.error);
      return responseData.error;
  
  
    } catch (error) {
        return  error;
    }
  };

  export default newTeam;