import { Component, OnInit } from '@angular/core';
import {ApiserviceService} from '../apiservice.service';

@Component({
  selector: 'app-read',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {


  historyData: any;
  
  constructor() { }


  ngOnInit() {

    this.historyData = {
      main : {},
    };
   
    this.getWeatherData();
   console.log(this.historyData);
  }


  getWeatherData(){
    fetch('https://api.weatherapi.com/v1/history.json?key=0419f763b19f42fba7b181204223006&q=Ostratice&dt=2022-06-28')
    .then(response=>response.json())
    .then(data=>{this.setWeatherData(data);})
    }

    // let data = JSON.parse('{"coord":{"lon":72.85,"lat":19.01},"weather":[{"id":721,"main":"Haze","description":"haze","icon":"50n"}],"base":"stations","main":{"temp":297.15,"feels_like":297.4,"temp_min":297.15,"temp_max":297.15,"pressure":1013,"humidity":69},"visibility":3500,"wind":{"speed":3.6,"deg":300},"clouds":{"all":20},"dt":1580141589,"sys":{"type":1,"id":9052,"country":"IN","sunrise":1580089441,"sunset":1580129884},"timezone":19800,"id":1275339,"name":"Mumbai","cod":200}');
    // this.setWeatherData(data);
  
    setWeatherData(data:any){
      this.historyData.main = data.forecast.forecastday[0].hour;
      

     // console.log(data.forecast.forecastday[0].hour)



    }
  


}
