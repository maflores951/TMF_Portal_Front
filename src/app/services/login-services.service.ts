
// import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';
// import { AuthConfig, OAuthModule, OAuthService } from 'angular-oauth2-oidc';
// import { Subject } from 'rxjs';

// const authCodeFlowConfig: AuthConfig = {
//   // Url of the Identity Provider
//   issuer: 'https://accounts.google.com',

//   // strict discovery document disallows urls which not start with issuers url
//   strictDiscoveryDocumentValidation: false,

//   // URL of the SPA to redirect the user to after login
//   // redirectUri: window.location.origin,
//   redirectUri: 'http://localhost:4200/user/loginGoogle',

//   // The SPA's id. The SPA is registerd with this id at the auth-server
//   // clientId: 'server.code',
//   clientId: '954536317663-lf7v587pn250oldsk27i3u34lnnld9ig.apps.googleusercontent.com',

//   // set the scope for the permissions the client should request
//   scope: 'openid profile email https://www.googleapis.com/auth/gmail.readonly',

//   showDebugInformation: true,
// };

// export interface UserInfo {
//   info: {
//     sub: string
//     email: string,
//     name: string,
//     picture: string
//   }
// }

// @Injectable({
//   providedIn: 'root',
// })

// export class LoginService {

//   _oAuthService : OAuthService;

//   userProfileSubject = new Subject<UserInfo>()

//   constructor(private readonly oAuthService: OAuthService, private router: Router) {
//    // confiure oauth2 service
//    this._oAuthService = oAuthService;
//    this.loginGoogle();
//   }

//   public loginGoogle(){
//     this._oAuthService.configure(authCodeFlowConfig);
//     // loading the discovery document from google, which contains all relevant URL for
//     // the OAuth flow, e.g. login url
//       // manually configure a logout url, because googles discovery document does not provide it
//        this._oAuthService.logoutUrl = "https://www.google.com/accounts/Logout";

//     this._oAuthService.loadDiscoveryDocument().then( () => {
//       // // This method just tries to parse the token(s) within the url when
//       // // the auth-server redirects the user back to the web-app
//       // // It doesn't send the user the the login page
//       this._oAuthService.tryLoginImplicitFlow().then( () => {

//         // when not logged in, redirecvt to google for login
//         // else load user profile
//         if (!this._oAuthService.hasValidAccessToken()) {
//           this._oAuthService.initLoginFlow()
//         } else {
//           this._oAuthService.loadUserProfile().then( (userProfile) => {
//             //  this.userProfileSubject.next(userProfile as UserInfo)
//              console.log(userProfile);
//              console.log(this._oAuthService.getAccessToken());
//               this.router.navigate(['']);
//           })
//         }

//       })
//     });
//   }
 
//   isLoggedIn(): boolean {
//     return this.oAuthService.hasValidAccessToken()
//   }

//   signOut() {
//     this.oAuthService.logOut()
//     this.router.navigateByUrl('');
//   }
// }