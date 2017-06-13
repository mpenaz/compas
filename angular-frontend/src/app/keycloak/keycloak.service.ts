import { Injectable } from '@angular/core';
import {document} from "ng2-bootstrap/utils/facade/browser";

declare var Keycloak: any;

@Injectable()
export class KeycloakService {
  static auth: any = {};

  static init(): Promise<any> {
    var keycloakConfig = {
      "url": "http://localhost:8080/auth",
      "realm": "Compas",
      "clientId": "compas",
    };

    let keycloakAuth: any = new Keycloak(keycloakConfig);
    KeycloakService.auth.loggedIn = false;
    return new Promise((resolve, reject) => {
      keycloakAuth.init({ onLoad: 'login-required' })
        .success(() => {
          KeycloakService.auth.loggedIn = true;
          KeycloakService.auth.authz = keycloakAuth;
          KeycloakService.auth.logoutUrl = keycloakAuth.authServerUrl + '/realms/Compas/protocol/openid-connect/logout?redirect_uri=' + document.baseURI;
          resolve();
        })
        .error(() => {
          reject();
        });
    });
  }

  logout() {
    /*console.log("token");
    console.log(KeycloakService.auth.authz.idTokenParsed);
    var obj = KeycloakService.auth.authz.idTokenParsed;
    console.log(obj.email);
    console.log(KeycloakService.auth.authz.tokenParsed);
    console.log(KeycloakService.auth.authz.refreshTokenParsed);*/
    console.log('*** LOGOUT');
    KeycloakService.auth.loggedIn = false;
    KeycloakService.auth.authz = null;

    window.location.href = KeycloakService.auth.logoutUrl;
  }

  getEmail(): string{
    var obj = KeycloakService.auth.authz.idTokenParsed;
    return (obj.email);
  }

  getToken(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      if (KeycloakService.auth.authz.token) {
        KeycloakService.auth.authz.updateToken(5)
          .success(() => {
            resolve(<string>KeycloakService.auth.authz.token);
          })
          .error(() => {
            reject('Failed to refresh token');
          });
      }
    });
  }
}
