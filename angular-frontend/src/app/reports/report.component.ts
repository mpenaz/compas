import {Component} from '@angular/core';
import {DataService} from "../shared/data.service";
import {User} from "app/shared/user";


@Component({
  templateUrl: 'report.component.html',
  styles: [`
    container-cards-pf{
      background-color: #f5f5f5;
    }
  `]
})

export class ReportComponent {
  subordinates: User[];
  selectedUser: User;

  constructor(private dataService: DataService){
    this.selectedUser = null;
  }

  expandCard(subordinate: User): void{
    if(this.selectedUser == null){
      console.log('select');
      this.selectedUser = subordinate;
    }
    else if(this.selectedUser == subordinate){
      console.log('deselect');
      this.selectedUser = null;
    }
  }

  clickOnError(): void{
    console.log('error');
  }

  ngOnInit(): void {
    this.getSubordinates();
  }

  getSubordinates(): void{
    this.dataService.getSubordinates().subscribe(data => {
      this.subordinates = data;
    });
  }

}
