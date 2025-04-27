import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../env/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _currentUser = new BehaviorSubject<string | null>(this.getStoredUser());
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  register(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/user/register`, credentials)
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/user/login`, credentials)
  }

  getCurrentUser(){
    return this._currentUser.asObservable();
  }

  getStoredUser(): string | null {
    return localStorage.getItem('currentUser');
  }

  setCurrentUSer(username: string): void {
    this._currentUser.next(username);
    localStorage.setItem('currentUser', username);
  }

  // Get the current user value directly
  getCurrentUserValue(): string | null {
    return this._currentUser.value;
  }

  // Clear the user on logout
  clearCurrentUser(): void {
    this._currentUser.next(null);
    localStorage.removeItem('currentUser');
  }

  isAuthenticated(): boolean{
    const user = this.getCurrentUserValue();
    return user !== null && user !== undefined && user !== '';
  }
}
