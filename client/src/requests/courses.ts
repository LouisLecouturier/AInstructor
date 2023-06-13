export const fetchCourses = async (token: string, user_id : string) => {
    const response = await fetch(`http://localhost:8000/api/course/mycourses/${user_id}`, {
      headers: {
        authorization: `bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  };