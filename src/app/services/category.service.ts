import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Category} from '../modules/admin layout/category/models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  readonly baseUrl: string = 'http://localhost:3000/category';
  private _categoryIdSource = new Subject<String>();
  categoryID$ = this._categoryIdSource.asObservable();
  accessToken = sessionStorage.getItem('accessToken');

  constructor(private _HttpClient: HttpClient) {

  }

  sendID(id: String) {
    this._categoryIdSource.next(id);
  }

  categoryIndex(): Observable<any> {
    return this._HttpClient.get(this.baseUrl);
  }

  categoryStore(data: JSON): Observable<any> {
    return this._HttpClient.post(this.baseUrl, data,{
      headers: {
        "Authorization": "Bearer " + this.accessToken
      }
    });
  }

  categoryDelete(id: any): Observable<any> {
    return this._HttpClient.delete(`${this.baseUrl}/${id.toString()}`,{
      headers: {
        "Authorization": "Bearer " + this.accessToken
      }
    });
  }

  categoryUpdate(id: string, cat: Category) {
    return this._HttpClient.patch(`${this.baseUrl}/${id}`, cat, {
      headers: {
        "Authorization": "Bearer " + this.accessToken
      }
    });
  }
}
