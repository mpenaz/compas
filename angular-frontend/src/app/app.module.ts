import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { KeycloakHttp, KEYCLOAK_HTTP_PROVIDER } from './keycloak/keycloak.http';
import { KeycloakService } from './keycloak/keycloak.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component'
import { ReportComponent } from './reports/report.component'
import {routing} from "./app.routes";
import {TeamComponent} from "./team/team.component";
import {AccordionModule, DatepickerModule, ModalModule, ProgressbarModule, TimepickerModule} from "ngx-bootstrap";
import {GoalDetailComponent} from "./goals/goal-detail.component";
import {GoalModalComponent} from "./goals/goal-modal.component";
import {PlanComponent} from "./plans/plan.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { ChartModule } from 'angular2-highcharts';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';
import {PlanProgressComponent} from "./plans/plan-progress.component";
import {PlanModalComponent} from "./plans/plan-modal.component";
import {SelectModule} from "ng2-select-compat";


declare var require: any;
export function highchartsFactory() {
  return require('highcharts');
}

@NgModule({
  declarations: [
    AppComponent,
    ReportComponent,
    HomeComponent,
    TeamComponent,
    GoalDetailComponent,
    GoalModalComponent,
    PlanModalComponent,
    PlanComponent,
    PlanProgressComponent,
  ],
  imports: [
    ChartModule,
    AccordionModule.forRoot(),
    ProgressbarModule.forRoot(),
    ModalModule.forRoot(),
    ReactiveFormsModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    SelectModule,
    TimepickerModule.forRoot(),
    DatepickerModule.forRoot(),
    BrowserAnimationsModule,
    routing
  ],
  providers: [
    {
      provide: HighchartsStatic,
      useFactory: highchartsFactory,
    },
    KeycloakService,
    KEYCLOAK_HTTP_PROVIDER,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
