import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WeatherClient } from '../models/weatherclient.model';
import { WeatherDetail } from '../models/weathetdetail.model';
import { environment } from 'src/environments/environment';
import { SuggestName } from '../models/suggest_search.model';

@Injectable({
  providedIn: 'root'
})
export class DetailService {

  constructor(private httpClient:HttpClient) { }
  getAllDetail(name)
  {
    return this.httpClient.get<WeatherDetail[]>(environment.API_URL+"/api/admin/weather_detail?name="+name);
  }
  suggestSearch(name)
  {
    return this.httpClient.get<SuggestName[]>(environment.API_URL+"/api/admin/suggest_search?name="+name);
  }
}
