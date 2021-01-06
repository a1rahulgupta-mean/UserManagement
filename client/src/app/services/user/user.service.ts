
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' , 'Access-Control-Allow-Origin': '*','Access-Control-Allow-Credentials': 'true' })
};



const apiUrl = 'http://localhost:3000/api/';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }

  getAllUser(): Observable<any> {
    const url = apiUrl + 'getAllUser';
    return this.http.get(url, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }


  addUser(data): Observable<any> {
    const url = apiUrl + 'addUser';
    return this.http.post(url, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  getSingleUser(userId): Observable<any> {
    const url = apiUrl + 'getSingleUser';
    return this.http.post(url,userId, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  
  deleteUser(data): Observable<any> {
    const url = apiUrl + 'deleteUser';
    return this.http.post(url, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateUser(data): Observable<any> {
    const url = apiUrl + 'updateUser';
    return this.http.post(url, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  fileUpload(data): Observable<any> {
    const url = apiUrl + 'fileUpload';
    return this.http.post(url, data)
      .pipe(
        catchError(this.handleError)
      );
  }
}