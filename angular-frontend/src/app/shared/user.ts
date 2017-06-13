import {Plan} from "../plans/plan";

export interface User{
  id: number;
  manager_id: number;
  name: string;
  email: string;
  plans: Plan[];
}
