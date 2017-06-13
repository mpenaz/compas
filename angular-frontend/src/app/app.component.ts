import {Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import { DataService } from './shared/data.service'
import {KeycloakService} from "./keycloak/keycloak.service";
import {User} from "./shared/user";
import {PlanModalComponent} from "./plans/plan-modal.component";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  providers: [DataService,
              KeycloakService,
              ],
})

export class AppComponent implements OnInit{
  @ViewChild(PlanModalComponent) private planModal: PlanModalComponent;

  currentUser: User;
  reportsSubmenu: false;
  activePlan: false;
  activeShared: false;

  constructor(private viewContainerRef: ViewContainerRef, private dataService: DataService, private keycloakService: KeycloakService){
    this.viewContainerRef = viewContainerRef;
  }

  logout(): void{
    this.keycloakService.logout();
  }

  ngOnInit(): void{
    this.getUserByMail();
  }

  getUserByMail(): void{
    this.dataService.getUsersByMail(this.keycloakService.getEmail()).subscribe(currentUser => this.currentUser = currentUser);
  }

  getCurrentUser(): void{
    this.dataService.getCurrentUser().subscribe(currentUser => this.currentUser = currentUser);
  }

  createPlan(): void{
    this.planModal.addPlan();
  }
}
