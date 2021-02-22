import { Injectable } from '@angular/core';
// import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
// import { auth } from 'firebase/app';

// import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
// import { UserInterface } from '../models/book';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from '../models/response';
import { Usuario } from '../models/usuario';
import { NavbarComponent } from '../components/navbar/navbar/navbar.component';

const httpOption ={
  headers: new HttpHeaders({
    'Contend-Type': 'application/json',
    // "Access-Control-Allow-Origin": "*",
    // "Access-Control-Allow-Credentials": "true",
    // "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
    // "Access-Control-Allow-Headers": "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthUserService {

    url: string = "https://localhost:44319/api/User/login";

    private usuarioSubject: BehaviorSubject<Usuario>;

    public get usuarioData(): Usuario{

      // var usuario = JSON.parse(sessionStorage.getItem('Usuario'));
      //  console.log(usuariot.UsuarioId);
      // if (usuariot == null){
      //   return null;
      // }else{
            return this.usuarioSubject.value;
      // }

    }

    constructor(private http: HttpClient){
      this.usuarioSubject =
      new BehaviorSubject<Usuario>(JSON.parse(sessionStorage.getItem('Usuario')));
    }

    login(email: string, password: string): Observable<Response>{
      // console.log("Entra " + email + " "+ password);
        return this.http.post<Response>(this.url, {email, password}, httpOption).pipe(
          map(res =>{
            //  console.log("Entra");
              if (res.exito === 1){
                const usuario: Usuario = res.data;
                
                sessionStorage.setItem("Usuario", JSON.stringify(usuario));
                 this.usuarioSubject.next(usuario);
              }
              return res;
          })
        );
    }

    logout(){
      
      sessionStorage.removeItem('Usuario');
      this.usuarioSubject.next(null);
      NavbarComponent.updateUserStatus.next(true);
    }
  // constructor(private afsAuth: AngularFireAuth, private afs: AngularFirestore) { }

  // private usuarioCollection: AngularFirestoreCollection<UserInterface>;
  // private usuarios: Observable<UserInterface[]>;

  // //Recuperar 1 libro
  // private usuarioDoc: AngularFirestoreDocument<UserInterface>;
  // private usuario: Observable<UserInterface>;

  // loginEmailUser(email: string, pass: string) {
  //   return new Promise((resolve, reject) =>{  
  //     this.afsAuth.auth.signInWithEmailAndPassword(email, pass)
  //     .then(userData => resolve(userData),
  //     err => reject(err));
  //   });
  // }

  // LogoutUser(){
  //   return this.afsAuth.auth.signOut();
  // }

  // isAuth(){
  //   return this.afsAuth.authState.pipe(map(auth=>auth));
  // }

  // isUserAdmin(userUid){
  //   return this.afs.doc<UserInterface>(`users/${userUid}`).valueChanges();
  // }
  
  // public selectedUsuario: UserInterface = {
  //   id: null,
  //   roles : null
  // };

  // updateUsuario(usuario: UserInterface): void { 
  //   let id = usuario.id;
  //   this.usuarioDoc = this.afs.doc<UserInterface>(`users/${id}`);
  //   this.usuarioDoc.update(usuario);
  //  }

  //  getAllUsuarios(){ 
  //   this.usuarioCollection = this.afs.collection<UserInterface>('users');
    
  //   return this.usuarios = this.usuarioCollection.snapshotChanges()
  //   .pipe(map(changes =>{
  //     return changes.map( action => {
  //       const data = action.payload.doc.data() as UserInterface;
  //       data.id = action.payload.doc.id;
  //       return data;
  //     });
  //   }));
  //  }

  //  getOneUsuario(idUsuario: string){
  //   this.usuarioDoc = this.afs.doc<UserInterface>(`users/${idUsuario}`);
  //   return this.usuario = this.usuarioDoc.snapshotChanges().pipe(map(action =>{
  //     // if (action.payload.exists === false) {
  //     //   return null;
  //     // }else{
  //       const data = action.payload.data() as UserInterface;
  //       data.id = action.payload.id;
  //       return data;
  //     // }
  //   }));
  //  }
}

