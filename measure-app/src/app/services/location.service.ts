import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LocationService {
  private baseUrl: string = `https://ipinfo.io/json?token=`;
  private accessKey: string = 'b982ebf358550b';
  private url: string = this.baseUrl + this.accessKey;

  constructor(private http: HttpClient) { }

  public getLocation(): Observable<any> {
    return this.http.get(this.url);
  }
}
