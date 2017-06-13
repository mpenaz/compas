import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ModalDirective} from "ng2-bootstrap";
import {DataService} from "../shared/data.service";
import {priorities} from "../shared/interfaces";
import {Goal} from "./goal";

@Component({
  selector: 'goal-modal',
  templateUrl: 'goal-modal.component.html',
})

export class GoalModalComponent implements OnInit{
  @ViewChild('largeModal') private createGoalModal: ModalDirective;
  @ViewChild('f') form: any;
  @Input() modalHeader: string;
  @Input() goal: Goal;
  @Input() plan_id: number;
  @Output() goalUpdated = new EventEmitter();
  @Output() goalCreated = new EventEmitter();

  priorities = priorities;
  model: any = {};

  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
    this.model.progress = 0;
    this.model.priority = priorities[1];
  }

  editGoal(): void{
    if(this.goal != null){
      this.update();
    }
    else{
      this.create();
    }
  }

  create(): void{
    if(this.form.valid){
      this.model.plan_id = this.plan_id;
      this.dataService.createGoal(this.model).subscribe(data => {
        this.goalCreated.emit(data);
        this.createGoalModal.hide();
      });
    }
  }

  update(): void{
    if(this.form.valid){
      this.dataService.updateGoal(this.goal.id, this.model).subscribe(data => {
        this.goalUpdated.emit(data);
        this.createGoalModal.hide();
      });
    }
  }

  onModalHide(): void{
    this.resetForm();
  }

  addGoal(): void{
    this.dataService.getUsersByMail("john.doe@mycompany.com").subscribe(x => console.log(x));
    if(this.goal != null){
      this.form.resetForm(this.goal, true);
    }
    else{
      this.resetForm();
    }
    this.createGoalModal.show();
  }

  close(): void{
    this.createGoalModal.hide();
  }

  resetForm(): void{
    this.form.resetForm({title: '', description: '', priority: 'Medium', progress: 0}, true);
  }
}


