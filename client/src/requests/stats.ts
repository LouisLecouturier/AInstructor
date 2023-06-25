export const getCourseStats = async (teamUUID : string, courseUUID : string, token: string ) => {
    
    const response = await fetch(`http://localhost:8000/api/stats/team/${teamUUID}/course/${courseUUID}`, {
      headers: {
        "Content-Type": "application/json",
        authorization : `bearer ${token}`
      },
    });
  return await response.json();
  };

export const getCourseStatsGlobal = async (courseUUID : string, token: string ) => {
      
      const response = await fetch(`http://localhost:8000/api/stats/course/${courseUUID}`, {
        headers: {
          "Content-Type": "application/json",
          authorization : `bearer ${token}`
        },
      });
  return await response.json();
}

export const getUserCoursesStats = async (userID : string, token: string ) => {
        const response = await fetch(`http://localhost:8000/api/stats/user/${userID}/courses`, {
          headers: {
            "Content-Type": "application/json",
            authorization : `bearer ${token}`
          },
        });
  return await response.json();

}