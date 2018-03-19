import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  })
};

@Injectable()
export class APIService {

  constructor(private http:HttpClient) {

  }

  getData(){
    return this.http.get('http://localhost:3000/api',httpOptions)
  }

}
