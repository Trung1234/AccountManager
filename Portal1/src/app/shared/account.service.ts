import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { AccountModel } from '../models/account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  myAppUrl: string;
  myApiUrl: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };
  constructor(private http: HttpClient) {
      this.myAppUrl = environment.appUrl;
      this.myApiUrl = 'Account/';
  }

  getAccounts(): Observable<AccountModel[]> {
    return this.http.get<AccountModel[]>(this.myAppUrl + this.myApiUrl)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  getAccount(postId: number): Observable<AccountModel> {
      return this.http.get<AccountModel>(this.myAppUrl + this.myApiUrl + postId)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  saveAccount(Account): Observable<AccountModel> {
      return this.http.post<AccountModel>(this.myAppUrl + this.myApiUrl, JSON.stringify(Account), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  updateAccount(postId: number, Account): Observable<AccountModel> {
      return this.http.put<AccountModel>(this.myAppUrl + this.myApiUrl + postId, JSON.stringify(Account), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  deleteAccount(postId: number): Observable<AccountModel> {
      return this.http.delete<AccountModel>(this.myAppUrl + this.myApiUrl + postId)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
