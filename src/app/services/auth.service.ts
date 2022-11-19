import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() { }


  loginIn(loginUser: User) : Observable<User>{
    var subject = new Subject<User>();
    let { user, password } = loginUser;
    setTimeout(()=>{
      if(user === 'test01' && password === 'test01'){
        subject.next(loginUser);
      } else {
        subject.error(loginUser);
      }
    },500);
    return subject.asObservable();
  }

  isLogged() {
    return localStorage.getItem('user') ? localStorage.getItem('user') : '';
  }
}