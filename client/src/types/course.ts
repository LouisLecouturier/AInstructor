import { Team } from "@/types/team";

export type Course = {
  uuid: string;
  name: string;
  team: string;
  description: string;
  subject: string;
  status: string;
  deliveryDate: string;
  creationDate: string;
  teams : Team[];
};
