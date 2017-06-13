import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ModalDirective} from "ng2-bootstrap";
import {DataService} from "../shared/data.service";
import {Goal} from "../goals/goal";

@Component({
  selector: 'plan-modal',
  templateUrl: 'plan-modal.component.html',
})

export class PlanModalComponent implements OnInit{
  @ViewChild('largeModal') private createPlanModal: ModalDirective;
  @ViewChild('f') form: any;
  @Input() modalHeader: string;
  @Input() goal: Goal;
  @Input() plan_id: number;
  @Output() goalUpdated = new EventEmitter();
  @Output() goalCreated = new EventEmitter();

  private items:Array<string> = ['Josh Brown', 'Petr Novak', 'Tom Hardy', 'Adam Novotny',
    'Petr Dvorak', 'Emil Stary'];

  private value:any = ['Athens'];

  public refreshValue(value:any):void {
    this.value = value;
    console.log(this.value);
  }

  model: any = {};

  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
  }

  editPlan(): void{
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
        this.createPlanModal.hide();
      });
    }
  }

  update(): void{
    if(this.form.valid){
      this.dataService.updateGoal(this.goal.id, this.model).subscribe(data => {
        this.goalUpdated.emit(data);
        this.createPlanModal.hide();
      });
    }
  }

  onModalHide(): void{
    this.resetForm();
  }

  addPlan(): void{
    if(this.goal != null){
      this.form.resetForm(this.goal, true);
    }
    else{
      this.resetForm();
    }
    this.createPlanModal.show();
  }

  close(): void{
    this.createPlanModal.hide();
  }

  resetForm(): void{
    this.form.resetForm({title: '', description: '', progress: 0}, true);
  }
}


