import { Conditions } from './condition.model';

export class WeatherDetail
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
   weather:Conditions
}