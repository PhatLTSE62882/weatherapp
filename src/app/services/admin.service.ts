import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  isLogged = false;
  constructor(private httpClient:HttpClient) { }
  setLogin(value,username)
  {
    this.isLogged = value;
   
  }
  getLogin(key)
  {
      return localStorage.getItem(key) ? true : false;
  }
  loginByAdmin(user:User)
  {
    return this.httpClient.post(environment.API_URL+"/api/admin/login",user,{responseType:'text'});
  }
  
}
