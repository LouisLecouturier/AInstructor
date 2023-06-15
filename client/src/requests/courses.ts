import { Course } from "@/types/team";

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

  

export const updateCourse = async (token: string, course : Course) => {
  let {uuid, ...courseExceptUUID} = course;
  const response = await fetch(`http://localhost:8000/api/course/hello/${course.uuid}`, {
    method: "PUT",
    headers: {
      authorization: `bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(courseExceptUUID),
  });
  const data = await response.json();
  return data;
  
}

export const newCourse = async (id :string, token: string, formData: FormData, setPourcentage: (pourcentage: number) => void): Promise<{ status: number; data: { uuid: string } }> => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.upload.addEventListener('progress', (event) => {
      if (event.lengthComputable) {
        const loadedBytes = event.loaded;
        const totalBytes = event.total;
        const pourcentage = Math.round((loadedBytes / totalBytes) * 100);
        setPourcentage(pourcentage);
      }
    });

    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        const response = {
          status: xhr.status,
          data: JSON.parse(xhr.responseText),
        };
        resolve(response);
      } else {
        reject(new Error(xhr.statusText));
      }
    });

    xhr.addEventListener('error', () => {
      reject(new Error('An error occurred during the file upload.'));
    });

    xhr.open('POST', `http://localhost:8000/api/course/${id}`);
    xhr.setRequestHeader('authorization', `bearer ${token}`);
    xhr.send(formData);
  });
};
