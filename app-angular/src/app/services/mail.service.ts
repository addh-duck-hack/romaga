import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { ContactRequest, ContactResponse } from '../shared/interfaces/contact.interface';

@Injectable({
  providedIn: 'root'
})
export class MailService {
  private http = inject(HttpClient);
  env = environment;

  sendContactEmail(payload: ContactRequest): Observable<ContactResponse> {
    return this.http.post<ContactResponse>(`${this.env.urlbackend}/api/ds/mail/send-email`, payload);
  }
}
