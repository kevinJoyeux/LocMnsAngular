import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { location } from '../models/location';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  public _location: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  public _utilisateurs: BehaviorSubject<any> = new BehaviorSubject<any>([]);

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
  public getlocationUtilisateur() {
    this.http.get('http://localhost:8080/utilisateurs')
      .subscribe((utilisateurs: any) => this._utilisateurs.next(utilisateurs));
  }
  public LocationValide(id: number | undefined): Observable<any> {
    return this.http.get('http://localhost:8080/locationvalide/' + id);
  }
  public LocationRefusee(id: number | undefined): Observable<any> {
    return this.http.get('http://localhost:8080/locationrefusee/' + id);
  }
  public LocationUtilisateurtrue(id: number | undefined) {
    this.http.get('http://localhost:8080/locationutilisateurtrue/' + id).subscribe((location: any) => this._location.next(location));
  }
  public LocationUtilisateurfalse(id: number | undefined) {
    this.http.get('http://localhost:8080/locationutilisateurfalse/' + id).subscribe((location: any) => this._location.next(location));
  }
}

