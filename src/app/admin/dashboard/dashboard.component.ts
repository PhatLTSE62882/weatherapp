import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';
import { AdminService } from 'src/app/services/admin.service';
import { environment } from 'src/environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { WeatherDetail } from 'src/app/models/weathetdetail.model';
import { DashboardDetail } from 'src/app/models/dashboard_detail.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  form: {
    weatherId: 0,
    city: '',
    country: ''
    region: '',
    tempure: '',
    rain: '',
    windSpeed: '',
    date: '',
    weatherCondition: '',
    dayOfWeek: number,
  }
  weatherDetail: DashboardDetail = {
    id: 0,
    date: '',
    dayOfWeek: '',
    name: '',
    rain: 0,
    tempureMorning: 0,
    tempureNight: 0,
    weatherId: 0,
    windSpeed: 0,
    weather: {
      weatherCondition: '',
      id: 0,
      name: '',
      country: '',
      region: '',
      temp: 0,
    }
  };
  queryId = "";
  constructor(private dashboardService: DashboardService,
    private adminService: AdminService,
    private router: Router,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    if (this.getUsernameLogging() === false) {
      this.router.navigateByUrl("");
    }
    this.queryId = this.activatedRoute.snapshot.queryParamMap.get("id");
    if (this.queryId !== undefined && this.queryId !== null) {
      console.log(this.queryId);
      this.getDetailWeather(parseInt(this.queryId));

    } else {
      console.log(this.queryId);
    }

  }
  getUsernameLogging() {
    return this.adminService.getLogin(environment.LOGIN_SUCCESSFULL);
  }
  getDetailWeather(id: number) {
    this.dashboardService.getWeather(id).subscribe(res => {
      console.log(this.weatherDetail = res);
    });
  }
  onSubmit(form) {
    // console.log(form.value);
    let day = new Date(form.value.date);
    this.form = form.value;
    let dayOfWeek = day.getDay() + 1;
    this.form.dayOfWeek = dayOfWeek;
    console.log(this.form);

    this.toastr.success("SAVED SUCCESSFULLY", "SUCCESS");
    this.dashboardService.postWeather(this.form).subscribe(res => {
      console.log(res);
      if (res === true) {
        this.router.navigateByUrl("");
      }
    });

  }

}
