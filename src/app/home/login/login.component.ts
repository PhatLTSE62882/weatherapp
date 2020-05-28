import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { ActivatedRoute, Routes, Route, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username:string;
  password:string;
  errorMsg:string;
  constructor(private adminService:AdminService,private activatedRoute:ActivatedRoute,private route:Router) { }

  ngOnInit() {
  }
  submit()
  {
    console.log(this.username);
    console.log(this.password);
    var user:User = ({
      username:this.username,
      password:this.password
    });
    this.adminService.loginByAdmin(user).subscribe(res=>{
      if(res.toString().length != 0)
      {
        console.log(res);
        this.adminService.setLogin(true,res);
        localStorage.setItem(environment.LOGIN_SUCCESSFULL,res);
        this.route.navigateByUrl("/dashboard");
      }else
      {
         this.errorMsg = "Username or password maybe wrong";
      }
    })
  }

}
