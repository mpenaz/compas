import {Component, OnInit} from '@angular/core';
import {DataService} from "../shared/data.service";
import {User} from "../shared/user";


@Component({
  templateUrl: 'home.component.html',
})

export class HomeComponent implements OnInit{
  currentUser: User;

  constructor(private dataService: DataService){
  }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCurrentUser(): void{
    this.dataService.getCurrentUser().subscribe(currentUser => {
      this.currentUser = currentUser;
    });
  }

}
