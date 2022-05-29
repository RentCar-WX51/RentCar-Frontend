import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";
import {Car} from "../model/car";

@Injectable({
  providedIn: 'root'
})
export class CarsService {

  basePath = 'https://rentcar-json-server.herokuapp.com/cars';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }

  constructor(private http: HttpClient) { }

  // API Error Handling
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Default error handling
      console.log(`An error occurred: ${error.error.message} `);
    } else {
      // Unsuccessful Response Error Code returned from Backend
      console.error(
        `Backend returned code ${error.status}, body was: ${error.error}`
      );
    }
    // Return Observable with Error Message to Client
    return throwError(() => new Error('Something happened with request, please try again later'));
  }

  create(item: any): Observable<Car> {
    return this.http.post<Car>(this.basePath, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  getById(id: any): Observable<Car> {
    return this.http.get<Car>(`${this.basePath}/${id}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
  getAll(): Observable<Car>{
    return this.http.get<Car>(this.basePath, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  update(id: any, item: any): Observable<Car> {
    return this.http.put<Car>(`${this.basePath}/${id}`, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
  delete(id: any) {
    return this.http.delete(`${this.basePath}/${id}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }


}
