import { Component, OnInit } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';
import { HomeService } from 'src/app/services/home.service';
import { WeatherHomePage } from 'src/app/models/weatherhomepage.model';


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  time: '';
  empData = [{
    userId: 1,
    'title': 'bcd',
    'body': 'asgasg'
  }, {
    userId: 2,
    'title': 'bcd',
    'body': 'asgasg'
  }, {
    userId: 3,
    'title': 'bcd',
    'body': 'asgasg'
  }]
  array = ["1", 2, "5", "4"];
  weathers:WeatherHomePage[] = [{
      id:0,
      name:'',
      country:'',
      region:'',
      tempure:0,
      weathercondition:'',
      date:'',
  }];
  constructor(private homeSerivce:HomeService) { 
   this.getWeathers();

  }

  ngOnInit() {

    var sorted = this.empData.sort((a, b) =>
      (a.userId > b.userId) ? -1 : 1 
    ); //DESC
    var sorted = this.empData.sort((a, b) =>
    (a.userId > b.userId) ? 1 : -1 
    ); //ASC
    var filted = this.empData.filter((element)=>{
      return element.userId >= 2
    });
    console.log(filted);
  }

  sortItem(arr, type) {
    if (type === "City") {
      arr.sort((arrA: any, arrB: any) => {
        if (arrA.userId > arrB.userId) return 1;
        if (arrA.userId < arrB.userId) return 0;
        return 0;
      });
    }
  }
  onHandleChange() {
    console.log(this.time);
  }
  getWeathers()
  {
    this.homeSerivce.getAllWeatherToday().subscribe(res=>{
      console.log(this.weathers = res);
    });
  }
  timeZone(name,region)
  {
    if(name ==="Ho Chi Minh")
    {
      var timezone = new Date().toLocaleString("en-US", {timeZone: region+"/Ho_chi_minh"});
      var date = new Date(timezone);
      var getTime = this.dayOfweek(date.getDay()+1) +" "+ date.getHours() +":"+date.getMinutes() +":" + date.getSeconds();
      return getTime;
    }
    var timezone = new Date().toLocaleString("en-US", {timeZone: region+"/"+name});
    var date = new Date(timezone);
    var getTime = this.dayOfweek(date.getDay()+1) +" "+ date.getHours() +":"+date.getMinutes() +":" + date.getSeconds();
    return getTime;
   // timezone = new Date(timezone);
    //console.log('AEST time: '+timezone.toLocaleString())
 
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
}
