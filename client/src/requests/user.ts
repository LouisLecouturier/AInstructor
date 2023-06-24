import { User } from "@/types/user";

export const fetchUser = async (token: string, id: string) => {
  const response = await fetch(`http://localhost:8000/api/user/${id}`, {
    headers: {
      authorization: `bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};

export const updateUser = async (user :User, token : string) => {
  const response = await fetch(`http://localhost:8000/api/user/${user.id}`, {
    method: "PUT",
    headers: {
      authorization: `bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  const data = await response.json();
  return data;

};

export const deleteUser = async (id: string, token: string) => {
  const response = await fetch(`http://localhost:8000/api/user/${id}/delete`, {
    method: "DELETE",
    headers: {
      authorization: `bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
}