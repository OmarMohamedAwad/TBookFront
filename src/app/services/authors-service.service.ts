import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {Author} from '../modules/admin layout/author/models/author';

@Injectable({
  providedIn: 'root'
})
export class AuthorsServiceService {
  private _authorIdSource = new Subject<String>();
  authorID$ = this._authorIdSource.asObservable();
  constructor(private authorClient: HttpClient) { }
  readonly baseURL: string = "https://tbookback.herokuapp.com/author";
  accessToken = sessionStorage.getItem('accessToken');

  sendID(id:String){
    this._authorIdSource.next(id);
  }

  getAuthors() {
    //fetch list of authors
    return this.authorClient.get(this.baseURL,{
      observe:'response'
    })
  }

  search(keyword:string,page:number){
    return this.authorClient.get(`${this.baseURL}/search/${keyword} ?page=${page}`,{observe:"response"})
  }

  pagination(page:number){
    return this.authorClient.get(`${this.baseURL}/pages?page=${page}`,{
      observe:"response"
    });
  }

  postAuthor(author:Author){
    return this.authorClient.post(this.baseURL,author,{
      headers: {
        "Authorization": "Bearer " + this.accessToken
      }
    })
  }

  deleteAuthor(id:string)
  {
    return this.authorClient.delete(`${this.baseURL}/${id}`, {
      headers: {
        "Authorization": "Bearer " + this.accessToken
      }
    })
  }

  getAuthorById(id: number) {
    //fetch authors by id
    return this.authorClient.get(`${this.baseURL}/${id}`)
  }

  updateAuthor(id:string, author:Author)
    {
      return this.authorClient.patch(`${this.baseURL}/${id}`,author, {
        headers: {
          "Authorization": "Bearer " + this.accessToken
        }
      });
    }

///Author Details
  show(id:any): Observable<any> {
    return this.authorClient.get(`${this.baseURL}/${id}`)
  }
}
