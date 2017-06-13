import {AfterViewInit, Component, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {DataService} from "../shared/data.service";
import {User} from "../shared/user";

import {GoalModalComponent} from "../goals/goal-modal.component";
import {Goal} from "../goals/goal";
import {Plan} from "../plans/plan";
import {PlanProgressComponent} from "./plan-progress.component";

@Component({
  selector: 'plan-overview',
  templateUrl: 'plan.component.html',
  providers: [DataService],
})

export class PlanComponent implements OnInit, OnChanges{
  @Input() user: User;
  @ViewChild(GoalModalComponent) private goalModal: GoalModalComponent;
  @ViewChild(PlanProgressComponent) private planProgress: PlanProgressComponent;

  currentUser: User;
  selectedPlan: Plan;
  @Input() manager: boolean; //TRUE -> REPORTS VIEW, FALSE -> PERSONAL VIEW

  planChanged(event): void{
    this.selectedPlan = event;
    this.updateGraph();
  }

  constructor(private dataService: DataService) {
  }

  updateGraph(): void{
    this.planProgress.updateGraph(this.selectedPlan);
  }

  ngOnChanges(): void{
    if(!!this.user){
      this.currentUser = this.user;
      this.selectedPlan = this.currentUser.plans[0];
      //this.updateGraph();
    }
  }

  ngOnInit(): void{
  }

  goalUpdated(goal: Goal): void{
    var search = this.selectedPlan.goals.filter(x => x.id === goal.id)[0];
    var index = this.selectedPlan.goals.indexOf(search);
    this.selectedPlan.goals[index] = goal;
    this.updateGraph();
  }

  goalCreated(goal: Goal): void{
    this.selectedPlan.goals.splice(0,0, goal);
    this.updateGraph();
  }

  goalRemoved(id: number): void{
    var goal = this.selectedPlan.goals.filter(x => x.id === id)[0];
    var index = this.selectedPlan.goals.indexOf(goal);
    this.selectedPlan.goals.splice(index, 1);
    this.updateGraph();
  }

  addGoal(): void{
    this.goalModal.addGoal();
  }
}
