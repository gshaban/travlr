import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthResponse } from '../models/auth-response';
import { BROWSER_STORAGE } from '../storage';
import { Trip } from '../models/trip';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class TripDataService {
  private readonly baseUrl = 'http://localhost:3000/api';
  private readonly apiBaseUrl = `${this.baseUrl}/trips`;

  constructor(
    private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage
  ) { }

  public getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.apiBaseUrl);
  }

  public getTrip(tripCode: string): Observable<Trip> {
    return this.http.get<Trip>(`${this.apiBaseUrl}/${tripCode}`);
  }

  public addTrip(formData: Trip): Observable<Trip> {
    return this.http.post<Trip>(this.apiBaseUrl, formData);
  }

  public updateTrip(tripCode: string, formData: Trip): Observable<Trip> {
    return this.http.put<Trip>(`${this.apiBaseUrl}/${tripCode}`, formData);
  }

  public deleteTrip(tripCode: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiBaseUrl}/${tripCode}`);
  }

  public login(user: User, passwd: string): Observable<AuthResponse> {
    return this.handleAuthAPICall('login', user, passwd);
  }

  public register(user: User, passwd: string): Observable<AuthResponse> {
    return this.handleAuthAPICall('register', user, passwd);
  }

  private handleAuthAPICall(endpoint: string, user: User, passwd: string): Observable<AuthResponse> {
    const formData = {
      name: user.name,
      email: user.email,
      password: passwd
    };

    return this.http.post<AuthResponse>(`${this.baseUrl}/${endpoint}`, formData);
  }
}
