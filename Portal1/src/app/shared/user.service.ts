import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly BaseURI = 'https://localhost:44328/api';
  constructor(private http: HttpClient) { }
  login(formData) {
    return this.http.post(this.BaseURI + '/ApplicationUser/Login', formData);
  }
  getUserProfile() {
    return this.http.get(this.BaseURI + '/ApplicationUser/GetProfile');
  }
}
