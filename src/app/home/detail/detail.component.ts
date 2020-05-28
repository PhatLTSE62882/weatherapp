import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
import { WeatherHomePage } from 'src/app/models/weatherhomepage.model';
import { ActivatedRoute } from '@angular/router';
import { DetailService } from 'src/app/services/detail.service';
import { WeatherDetail } from 'src/app/models/weathetdetail.model';
import { SuggestName } from 'src/app/models/suggest_search.model';
import { environment } from 'src/environments/environment';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  queryName:string;
  weatherDetail:WeatherDetail[]=[{
    id:0,
    date:'',
    dayOfWeek:'',
    name:'',
    rain:0,
    tempureMorning:0,
    tempureNight:0,
    weatherId:0,
    windSpeed:0,
    weather:{
      weatherCondition:''
    }
  }];
  types=['string','int','float','double','object'];
  filted:string[];
  suggest:SuggestName[]=[{
    id:0,
    name:''
  }]
  dayOfWeekNumber:number;
  constructor(private activatedRoute:ActivatedRoute,private detailService:DetailService,private adminService :AdminService) { }

  ngOnInit() {
    this.queryName = this.activatedRoute.snapshot.queryParamMap.get("name");
    this.getAllWeatherByName(this.queryName);
    console.log(this.queryName);
    
   
  }

  getUsernameLogging()
  {
    return this.adminService.getLogin(environment.LOGIN_SUCCESSFULL);
  }
  getDate()
  {
    var today = new Date();
    return today.getDate()
  }
  getMonthName()
  {
    var today = new Date();
    return today.getMonth();
  }
  getAllWeatherByName(name)
  {
    this.detailService.getAllDetail(name).subscribe(res=>{
      console.log(this.weatherDetail=res);
    })
  }
  suggestSearch(e)
  {
    // console.log(e.target.value);
     var searchValue = e.target.value;
    // this.filted = this.types.filter((element)=>{
    //   return element.includes(searchValue);
    // });  
    if(searchValue.length != 0)
    {
      this.detailService.suggestSearch(searchValue).subscribe(res=>{
        console.log(this.suggest = res);
      });
    }else
    {
      this.resetSuggest();
    }
    
  }
  dayOfweek(date:number)
  {
    if(date===1)
    {
           return "Sunday"
    }
    if(date===2)
    {
           return "Monday"
    }
    if(date===3)
    {
           return "Tuesday"
    }
    if(date===4)
    {
           return "Wednesday"
    }
    if(date===5)
    {
           return "Thursday"
    }
    if(date===6)
    {
           return "Friday"
    }
    if(date===7)
    {
           return "Saturday"
    }
  }
  resetSuggest()
  {
    this.suggest=[{
      id:0,
      name:''
    }]
  }

  weatherConditionSwitch(weatherCondition:string) 
  {
    switch(weatherCondition)
    {
      case "Sun shine" : return "wt-1.png";
      case "Fog" : return "wt-9.png";
      case "Rain" : return "wt-18.png";
      case "Night" : return "wt-13.png";  
      case "Cloud" : return "wt-7.png";    
      case "Dry" : return "dry.png";   
      default: return "";
    }
  }

}
