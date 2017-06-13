import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from "@angular/core";
import {Goal} from "./goal";
import {DataService} from "../shared/data.service";
import {GoalModalComponent} from "./goal-modal.component";

@Component({
  selector: 'goal-detail',
  templateUrl: 'goal-detail.component.html',
  providers: [DataService],
})

export class GoalDetailComponent implements OnInit{
  @Input() goal: Goal;
  @Output() goalRemoved = new EventEmitter();
  @Output() goalUpdated = new EventEmitter();

  constructor(private dataService: DataService){

  }

  ngOnInit(): void {

  }

  removeGoal(id: number){
      this.dataService.deleteGoal(id).subscribe(res => {
        this.goalRemoved.emit(id);
      });
  }

  goalUpdate(goal: Goal): void{
    this.goal = goal;
    this.goalUpdated.emit(goal);
  }

  //modal
  @ViewChild('goalModal') private goalModal: GoalModalComponent;
  addGoal(): void{
    this.goalModal.addGoal();
  }
}
