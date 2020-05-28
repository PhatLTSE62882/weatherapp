import { Conditions } from './condition.model';
import { WeatherHeader } from './weather_header.model';

export class DashboardDetail
{
   id:number;
   weatherId:number;
   dayOfWeek:string;
   tempureMorning:number;
   tempureNight:number;
   rain:number;
   windSpeed:number;
   date:string;
   name:String;
   weather:WeatherHeader;
}