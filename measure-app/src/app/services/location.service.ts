import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LocationService {

  constructor(private http: HttpClient) { }

  public getLocation(url: string): Observable<any> {
    return this.http.get(url);
  }
}
