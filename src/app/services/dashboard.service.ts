import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { WeatherDetail } from '../models/weathetdetail.model';
import { DashboardDetail } from '../models/dashboard_detail.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private httpClient:HttpClient) { }
  postWeather(form)
  {
      return this.httpClient.post(environment.API_URL+"/api/admin/weather",form);
  }

  updateWeather(form)
  {
      return this.httpClient.post(environment.API_URL+"/api/admin/update_weather",form);
  }

  getWeather(id:number)
  {
      return this.httpClient.get<DashboardDetail>(environment.API_URL+"/api/admin/weather_detail_id?id="+id);
  }
}
