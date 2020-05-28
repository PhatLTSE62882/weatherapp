import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WeatherHomePage } from '../models/weatherhomepage.model';
import { environment } from 'src/environments/environment';
import { LocationAddress } from '../models/location.model';
import { WeatherHeader } from '../models/weather_header.model';
import { ResponseCorona } from '../models/reponse_corona.model';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private httpClient :HttpClient) { }
  getAllWeatherToday()
  {
    return this.httpClient.get<WeatherHomePage[]>(environment.API_URL+"/api/admin/weather");
  }
  getIpAddress()
  {
    return this.httpClient.get("https://ipinfo.io/ip",{responseType: 'text'});
  }
  getLocationByIpAddress()
  {
    return this.httpClient.get<LocationAddress>("https://ipinfo.io/?token=3d6bfc05f31898");
  }
  getWeatherHeader(location)
  {
    return this.httpClient.get<WeatherHeader[]>(environment.API_URL+"/api/admin/weather_header?location="+location);
  }
  getCoronaSituation(location:string)
  {
    return this.httpClient.get<ResponseCorona>(environment.API_URL+"/api/admin/coronavirus?location="+location);
  }
}
