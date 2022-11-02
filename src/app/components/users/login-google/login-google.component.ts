// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Component, OnInit } from '@angular/core';
// import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
// import { EventMessage, EventType } from '@azure/msal-browser';
// import { Subject } from 'rxjs';
// import { filter } from 'rxjs/operators';
// import { DataApiService } from 'src/app/services/data-api.service';
// import { LoginService } from 'src/app/services/login-services.service';

// const GRAPH_ENDPOINT = 'https://login.microsoftonline.com/11213b50-17df-49ab-bb19-23220120e176/saml2';//'https://graph.microsoft.com/v1.0/me';
// @Component({
//   selector: 'app-login-google',
//   templateUrl: './login-google.component.html',
//   styleUrls: ['./login-google.component.css'],
// })
// export class LoginGoogleComponent implements OnInit {
//   constructor(
//     private authService: MsalService,
//     private msalBroadcastService: MsalBroadcastService,
//     private dataApi: DataApiService,
//     private http: HttpClient,
//   ) {}

//   title = 'msal-angular-tutorial';
//   isIframe = false;
//   loginDisplay = false;
//   private readonly _destroying$ = new Subject<void>();
//   ngOnInit(): void {
//     this.msalBroadcastService.msalSubject$
//       .pipe(
//         filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS)
//       )
//       .subscribe((result: EventMessage) => {
//         console.log(result);
//       });
//   }

//   login() {
//     this.authService.loginPopup().subscribe({
//       next: (result) => {
//         console.log(result);
//         // this.setLoginDisplay();
//       },
//       error: (error) => console.log(error),
//     });
//   }

//   CerrarSesion() { // Add log out function here
//     this.authService.logoutPopup();
//     sessionStorage.clear();
//   }

//   ngOnDestroy(): void {
//     this._destroying$.next(undefined);
//     this._destroying$.complete();
//   }

//   public url: string;
//   public httpOption = {
//     headers: new HttpHeaders({
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJub25jZSI6IlJyalN3OS1xdFd6T2tnU3JVR1FzVmxBT2o0dkpEWHQwcjV3akRqQVpWMVUiLCJhbGciOiJSUzI1NiIsIng1dCI6IjJaUXBKM1VwYmpBWVhZR2FYRUpsOGxWMFRPSSIsImtpZCI6IjJaUXBKM1VwYmpBWVhZR2FYRUpsOGxWMFRPSSJ9`,
//       "Access-Control-Allow-Origin": "*",
//       "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
//     }),
//   };

//   Parametros() {
//      this.http.get(GRAPH_ENDPOINT)
//       .subscribe(profile => {
//         console.log(profile) ;
//       });
  
//     // this.url = "https://login.microsoftonline.com/11213b50-17df-49ab-bb19-23220120e176/oauth2/v2.0/token";
//     // this.http.get<any>(this.url, this.httpOption).subscribe((r)=>{
//     //   console.log(r);
//     // }, 
//     // (error) =>{
//     //   console.error(error);
//     // }) ;

//     // console.log(sessionStorage.getItem('e31b6c1d-c8b9-4525-b2a3-c7b9098e06b5.11213b50-17df-49ab-bb19-23220120e176-login.windows.net-idtoken-8f4d0b0a-51b1-43ae-bb34-cb0e9bdb65a7-11213b50-17df-49ab-bb19-23220120e176---'));
//     // console.log("Entra");
//     // this.dataApi.GetList('/Parametros').subscribe(
//     //   (parametrost) => {
//     //     console.log(parametrost);
//     //     // this.parametros = parametrost;
//     //     // this.cambiarEstatusSpinner(false);
//     //   },
//     //   (error) => {
//     //     // console.error(error);
//     //     console.log(error);
//     //     // this.toastr.error(
//     //     //   'Error en el servidor, contacte al administrador del sistema.',
//     //     //   'Error',
//     //     //   {
//     //     //     timeOut: 3000,
//     //     //   }
//     //     // );
//     //     // this.cambiarEstatusSpinner(false);
//     //   }
//     // );

//   }

//   setLoginDisplay() {
//     this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
//   }

//   logOutWithGoogle(): void {
//     // this.loginService.signOut();
//     //  this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(() => console.log(this.socialAuthService.authState) );
//     // this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
//     // console.log("ENyra")
//     // this.loginService.loginForUser();
//   }
// }
