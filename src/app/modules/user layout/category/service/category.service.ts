import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  readonly baseURL: string = "https://tbookback.herokuapp.com/category";

  constructor(private categoryClient: HttpClient) { }

  getCategories() {
    return this.categoryClient.get(this.baseURL,{observe:'response'})
  }

  getCategoryPage(name:string , page:number , book:string="") {
    console.log(name , page , (book ==""))
    if(book == "")
      return this.categoryClient.get(`${this.baseURL}/pages?name=${name}&page=${page}`,{observe:'response'})
    else
      return this.categoryClient.get(`${this.baseURL}/pages?name=${name}&page=${page}&bookName=${book}`,{observe:'response'})
  }

}
