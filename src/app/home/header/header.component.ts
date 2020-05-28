import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
import { LocationAddress } from 'src/app/models/location.model';
import { AdminService } from 'src/app/services/admin.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  ipAddress: String;
  locationAddress: LocationAddress;
  username: string;
  login=false;
  constructor(private homeService: HomeService, private adminService: AdminService, private router: Router) { }

  ngOnInit() {
    //this.getIp();
   this.getUsernameLogging();
    if (this.login === true) {
      this.username = localStorage.getItem(environment.LOGIN_SUCCESSFULL).toString();
      console.log("true");
    } else {
      this.username = "0";
      console.log("false");
    }
  }


  logout() {
    this.adminService.setLogin(false, null);
    localStorage.removeItem(environment.LOGIN_SUCCESSFULL);
    this.router.navigateByUrl("");
  }
  getUsernameLogging() {
     this.login = this.adminService.getLogin(environment.LOGIN_SUCCESSFULL);
  }
  getIp() {
    this.homeService.getIpAddress().subscribe(res => {
      console.log(this.getLocation());
    })
  }
  getLocation() {
    this.homeService.getLocationByIpAddress().subscribe(res => {
      console.log(this.locationAddress = res);
    })
  }
  timeZone(name: string, region) {
    if (name.split(" ")) {
      name = name.replace(" ", "_");
      var timezone = new Date().toLocaleString("en-US", { timeZone: region + "/" + name });
      var date = new Date(timezone);
      var getTime = this.dayOfweek(date.getDay() + 1) + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
      return getTime;
    }
    var timezone = new Date().toLocaleString("en-US", { timeZone: region + "/" + name });
    var date = new Date(timezone);
    var getTime = this.dayOfweek(date.getDay() + 1) + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    return getTime;
  }
  dayOfweek(date: number) {
    if (date === 1) {
      return "Sunday"
    }
    if (date === 2) {
      return "Monday"
    }
    if (date === 3) {
      return "Tuesday"
    }
    if (date === 4) {
      return "Wednesday"
    }
    if (date === 5) {
      return "Thursday"
    }
    if (date === 6) {
      return "Friday"
    }
    if (date === 7) {
      return "Saturday"
    }
  }
}
