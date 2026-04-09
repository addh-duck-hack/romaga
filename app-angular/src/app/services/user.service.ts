import { inject, Injectable, signal } from '@angular/core';
import { User, UserResponse } from '../shared/interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private http = inject(HttpClient);
  env = environment;
  sessionUser = signal<User | null>(null);

  constructor() {
    this.loadSession();
  }

  saveSession(user: User): void {
    this.sessionUser.set(user);
    localStorage.setItem(this.env.localStorageName, JSON.stringify(user));
  }

  loadSession(): void {
    const data = localStorage.getItem(this.env.localStorageName);
    if (data) {
      const user: User = JSON.parse(data);
      this.sessionUser.set(user);
    }
  }

  clearSession(): void {
    this.sessionUser.set(null);
    localStorage.removeItem(this.env.localStorageName);
  }

  loginNewSession(email:string, pass:string):Observable<UserResponse> {
    const bodyRequest = {
      email: email,
      password: pass
    };
    return this.http.post<UserResponse>(`${ this.env.urlbackend }/api/ds/users/login`,bodyRequest);
  }
}
