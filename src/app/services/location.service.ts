import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { location } from '../models/location';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  public _location: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  public _utilisateurs: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  constructor(private http: HttpClient) { }
  public getlocations(): Observable<any> {
    return this.http.get<location>(environment.serverUrl + '/location');
  }

  public deletelocation(id: number): Observable<any> {
    return this.http.delete(environment.serverUrl + '/location/' + id);
  }

  public editionlocation(location: any): Observable<any> {
    return this.http.post(environment.serverUrl + '/location', location);
  }

  public getlocation(id: number): Observable<any> {
    return this.http.get(environment.serverUrl + '/location/' + id);
  }
  public getLocationValidee() {
    this.http.get(environment.serverUrl + '/locationvalidee').subscribe((location: any) => this._location.next(location));
  }
  public getLocationAttente() {
    this.http.get(environment.serverUrl + '/locationattente').subscribe((location: any) => this._location.next(location));
  }
  public getLocationOrderByDateDebutLocationPrevue() {
    this.http.get(environment.serverUrl + '/locationDateDebutPrevue').subscribe((location: any) => this._location.next(location));
  }
  public getLocationOrderByDateFinLocationPrevue() {
    this.http.get(environment.serverUrl + '/locationDateFinPrevue').subscribe((location: any) => this._location.next(location));
  }
  public getLocationOrderByDateProlongation() {
    this.http.get(environment.serverUrl + '/locationDateProlongation').subscribe((location: any) => this._location.next(location));
  }
  public getLocationOrderByDateDecision() {
    this.http.get(environment.serverUrl + '/locationDateDecision').subscribe((location: any) => this._location.next(location));
  }
  public getlocationUtilisateur() {
    this.http.get(environment.serverUrl + '/utilisateurs')
      .subscribe((utilisateurs: any) => this._utilisateurs.next(utilisateurs));
  }
  public LocationValide(id: number | undefined): Observable<any> {
    return this.http.get(environment.serverUrl + '/locationvalide/' + id);
  }
  public LocationRefusee(id: number | undefined): Observable<any> {
    return this.http.get(environment.serverUrl + '/locationrefusee/' + id);
  }
  public LocationUtilisateurtrue(id: number | undefined) {
    this.http.get(environment.serverUrl + '/locationutilisateurtrue/' + id).subscribe((location: any) => this._location.next(location));
  }
  public LocationUtilisateurfalse(id: number | undefined) {
    this.http.get(environment.serverUrl + '/locationutilisateurfalse/' + id).subscribe((location: any) => this._location.next(location));
  }
}

