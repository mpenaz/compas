import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import {ReportComponent} from "./reports/report.component";
import {TeamComponent} from "./team/team.component";

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'reports', component: ReportComponent },
  { path: 'shared', component: TeamComponent},
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
