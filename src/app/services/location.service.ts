import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { location } from '../models/location';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  public _location: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  constructor(private http: HttpClient) { }
  public getlocations(): Observable<any> {
    return this.http.get<location>('http://localhost:8080/location');
  }

  public deletelocation(id: number): Observable<any> {
    return this.http.delete("http://localhost:8080/location/" + id);
  }

  public editionlocation(location: any): Observable<any> {
    return this.http.post("http://localhost:8080/location", location);
  }

  public getlocation(id: number): Observable<any> {
    return this.http.get("http://localhost:8080/location/" + id);
  }
  public getLocationValidee() {
    this.http.get('http://localhost:8080/locationvalidee').subscribe((location: any) => this._location.next(location));
  }
  public getLocationAttente() {
    this.http.get('http://localhost:8080/locationattente').subscribe((location: any) => this._location.next(location));
  }
  public getLocationOrderByDateDebutLocationPrevue() {
    this.http.get('http://localhost:8080/locationDateDebutPrevue').subscribe((location: any) => this._location.next(location));
  }
  public getLocationOrderByDateFinLocationPrevue() {
    this.http.get('http://localhost:8080/locationDateFinPrevue').subscribe((location: any) => this._location.next(location));
  }
  public getLocationOrderByDateProlongation() {
    this.http.get('http://localhost:8080/locationDateProlongation').subscribe((location: any) => this._location.next(location));
  }
  public getLocationOrderByDateDecision() {
    this.http.get('http://localhost:8080/locationDateDecision').subscribe((location: any) => this._location.next(location));
  }
}
