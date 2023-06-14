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


export const newCourse = async (token: string, formData : FormData) => {
  const response = await fetch(`http://localhost:8000/api/course/`, {
    method: "POST",
    headers: {
      authorization: `bearer ${token}`,
    },
    body: formData,
  });
  const data = await response.json();
  return data;
}