import {Goal} from "../goals/goal";

export interface Plan{
  id: number;
  user_id: number;
  evaluation_id: number;
  start: string;
  end: string;
  status: string;
  goals: Goal[];
}
