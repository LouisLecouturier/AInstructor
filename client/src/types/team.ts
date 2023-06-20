import { User } from "@/types/user";

export type Team = {
  uuid: number;
  users?: User[];
  name: string;
  description?: string;
  color: string;
};