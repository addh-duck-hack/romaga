import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { map, Observable } from 'rxjs';
import { DestinationInegi, DestinationResponse } from '../shared/interfaces/destination.interface';
import { CostInegi, RouteCostResponse } from '../shared/interfaces/route.cost.interface';

@Injectable({
  providedIn: 'root'
})
export class InegiService {
  private http = inject(HttpClient);
  env = environment;

  constructor() { }

  getDestination(search: string, token: string): Observable<DestinationInegi[]>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<DestinationResponse>(
      `${ this.env.urlbackend }/api/ds/destination/${ search }`,
      { headers }
    ).pipe(
      map(({ inegi }) => inegi),
      map(({ data }) => data)
    );
  }

  calculateRoute(origin: string, destination: string, vehicle: string, over: string, token: string): Observable<CostInegi> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const bodyRequest = {
      origin: origin,
      destination: destination,
      vehicleType: vehicle,
      over: over
    };

    return this.http.post<RouteCostResponse>(
      `${ this.env.urlbackend }/api/ds/route/cost/calculate`,
      bodyRequest,
      { headers }
    ).pipe(
      map(({ inegi }) => inegi),
      map(({ data }) => data)
    );
  }
}
