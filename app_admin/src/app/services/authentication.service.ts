import { Inject, Injectable } from '@angular/core';

import { AuthResponse } from '../models/auth-response';
import { BROWSER_STORAGE } from '../storage';
import { TripDataService } from './trip-data.service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private authResp: AuthResponse = new AuthResponse();

  constructor(
    @Inject(BROWSER_STORAGE) private storage: Storage,
    private tripDataService: TripDataService
  ) { }

  public getToken(): string {
    const token = this.storage.getItem('travlr-token');
    return token || '';
  }

  public saveToken(token: string): void {
    this.storage.setItem('travlr-token', token);
  }

  public logout(): void {
    this.storage.removeItem('travlr-token');
  }

  public isLoggedIn(): boolean {
    const token = this.getToken();

    if (!token) {
      return false;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > (Date.now() / 1000);
    } catch (error) {
      this.logout();
      return false;
    }
  }

  public getCurrentUser(): User {
    const token = this.getToken();
    const { email, name } = JSON.parse(atob(token.split('.')[1]));
    return { email, name } as User;
  }

  public login(user: User, passwd: string): void {
    this.tripDataService.login(user, passwd)
      .subscribe({
        next: (value: AuthResponse) => {
          if (value) {
            this.authResp = value;
            this.saveToken(this.authResp.token);
          }
        },
        error: (error: unknown) => {
          console.log('Error: ', error);
        }
      });
  }

  public register(user: User, passwd: string): void {
    this.tripDataService.register(user, passwd)
      .subscribe({
        next: (value: AuthResponse) => {
          if (value) {
            this.authResp = value;
            this.saveToken(this.authResp.token);
          }
        },
        error: (error: unknown) => {
          console.log('Error: ', error);
        }
      });
  }
}
