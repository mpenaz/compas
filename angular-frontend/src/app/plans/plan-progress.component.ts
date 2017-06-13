import {AfterViewInit, Component, Input, OnChanges, OnInit} from "@angular/core";
import {Plan} from "./plan";

@Component({
  selector: 'plan-progress',
  template: `
    <chart #chart type="Chart" [options]="options" (load)="saveChart($event.context)"></chart>  
  `,
  styles: [`
    chart {
      display: block;
      width:100%;
      height:100%;
    }
  `]
})

export class PlanProgressComponent implements OnInit, AfterViewInit, OnChanges{
  @Input() data: Plan;

  progress: number;
  selectedPlan: Plan;
  chart: any;
  options: Object;

  constructor(){
    this.init();
  }

  saveChart(chart) {
    this.chart = chart;
  }

  ngOnChanges(): void{
    this.hookUpdate();
  }

  ngAfterViewInit(): void{
    this.hookUpdate();
  }

  ngOnInit(): void{
    this.hookUpdate();
  }

  hookUpdate(){
    if(this.chart != null && this.data != null){
      this.updateGraph(this.data);
    }
  }

  updateGraph(plan: Plan): void{
    this.selectedPlan = plan;
    this.progress = Math.round(this.countProgress());
    this.chart.series[0].data[0].update({y : this.progress});
    this.chart.series[0].data[1].update({y : 100 - this.progress});
    this.chart.title.update({text: 'Progress ' + this.progress + '%'});
  }

  countProgress(): number{
    let progressValue = 0;
    let value;

    for(let goal of this.selectedPlan.goals){
      progressValue = progressValue + goal.progress;
    }
    value = progressValue / this.selectedPlan.goals.length;
    return value;
  }

  init(): void{
    this.progress = 0;
    this.options = {
      tooltip: {
        pointFormat: '<b>{point.percentage:.1f}%</b>'
      },
      chart: {
        type: 'pie',
      },
      credits: {
        enabled: false
      },
      plotOptions: {
        pie: {
          innerSize: '70%',
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            distance: -20,
            enabled: false,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
          }
        }
      },
      title : { text : 'Plan progress ' + this.progress + '%',
        verticalAlign: 'middle',
      },
      series: [{
        name: 'Done',
        data: [{
          name: 'Done',
          y: 0
        }, {
          name: 'Left',
          y: 0
        }],
      }]
    };
  }
}
