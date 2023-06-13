export type Team = {
  users: User[];
  uuid: number;
  name: string;
  description?: string;
  color: string;
};

export type User = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  isTeacher: boolean;
  username: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
  bio: string;
  phone: string;
  


}

