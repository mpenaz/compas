import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";
import {Observable} from "rxjs";
import {User} from "./user";

import 'rxjs/add/operator/map';
import {Goal} from "../goals/goal";


@Injectable()
export class DataService {

  private headers = new Headers({'Content-type': 'application/json', 'Access-Control-Allow-Origin': '*'});
  private baseUrl = 'http://127.0.0.1:3000/';

  constructor(private http: Http){}


  //CRUD GOALS
  updateGoal(id: number, goal: Goal){
    return this.http.put(this.baseUrl + 'goals/' + id, goal, {headers: this.headers}).map(res => res.json());
  }

  getGoal(id: number): Observable<Goal>{
    return this.http.get(this.baseUrl + 'goals/' + id, {headers: this.headers}).map(res => res.json());
  }

  deleteGoal(id: number): Observable<void>{
    console.log(this.baseUrl + 'goals/' + id);
    return this.http.delete(this.baseUrl + 'goals/' + id).map(res => {return});
  }

  createGoal(goal: Goal): Observable<Goal>{
    return this.http.post(this.baseUrl + 'goals', goal, {headers: this.headers}).map(res => res.json());
  }

  //CRUD PLANS
  createPlans(){

  }

  updatePlan(){

  }

  createPlan(){

  }





  //USER RELATED
  getUsersByMail(mail: string): Observable<User>{
    return this.http.get(this.baseUrl + 'users?mail=' + mail, {headers: this.headers}).map(res => res.json());
  }

  getUsers(): Observable<User[]>{
    return this.http.get(this.baseUrl + 'users', {headers: this.headers}).map(res => res.json());
  }

  getCurrentUser(): Observable<User>{
    return this.http.get(this.baseUrl + 'users/me', {headers: this.headers}).map(res => res.json());
  }

  getSubordinates(): Observable<User[]>{
    return this.http.get(this.baseUrl + 'users/subordinates', {headers: this.headers}).map(res => res.json());
  }
}
