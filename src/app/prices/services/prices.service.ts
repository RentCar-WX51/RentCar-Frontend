import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";
import {Price} from "../model/price";

@Injectable({
  providedIn: 'root'
})
export class PricesService {

  // Prices Endpoint
  basePath = 'https://rentcar-json-server.herokuapp.com/prices';

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

  // Create Price
  create(item: any): Observable<Price> {
    return this.http.post<Price>(this.basePath, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  // Get Price by id
  getById(id: any): Observable<Price> {
    return this.http.get<Price>(`${this.basePath}/${id}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  // Get All Prices
  getAll(): Observable<Price> {
    return this.http.get<Price>(this.basePath, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  // Update Price
  update(id: any, item: any): Observable<Price> {
    return this.http.put<Price>(`${this.basePath}/${id}`, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  // Delete Price
  delete(id: any) {
    return this.http.delete(`${this.basePath}/${id}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
}
