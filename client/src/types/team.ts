export type Team = {
  users: User[];
  uuid: number;
  name: string;
  description?: string;
  color: string;
};

export type User = {
  uuid: string;
  first_name: string;
  last_name: string;
  email: string;
  isTeacher: boolean;
}