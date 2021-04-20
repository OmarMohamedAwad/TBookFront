import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private homeClient: HttpClient) { }
  readonly baseURL: string = "https://tbookback.herokuapp.com/home";
  getHome() {
    //fetch home
  return this.homeClient.get(this.baseURL,{observe:'response'})
  }
}
