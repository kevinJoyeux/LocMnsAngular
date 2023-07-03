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
    return this.http.get<location>(environment.ServerUrl + '/location');
  }

  public deletelocation(id: number): Observable<any> {
    return this.http.delete(environment.ServerUrl + '/location/' + id);
  }

  public editionlocation(location: any): Observable<any> {
    return this.http.post(environment.ServerUrl + '/location', location);
  }

  public getlocation(id: number): Observable<any> {
    return this.http.get(environment.ServerUrl + '/location/' + id);
  }
  public getLocationValidee() {
    this.http.get(environment.ServerUrl + '/locationvalidee').subscribe((location: any) => this._location.next(location));
  }
  public getLocationAttente() {
    this.http.get(environment.ServerUrl + '/locationattente').subscribe((location: any) => this._location.next(location));
  }
  public getLocationOrderByDateDebutLocationPrevue() {
    this.http.get(environment.ServerUrl + '/locationDateDebutPrevue').subscribe((location: any) => this._location.next(location));
  }
  public getLocationOrderByDateFinLocationPrevue() {
    this.http.get(environment.ServerUrl + '/locationDateFinPrevue').subscribe((location: any) => this._location.next(location));
  }
  public getLocationOrderByDateProlongation() {
    this.http.get(environment.ServerUrl + '/locationDateProlongation').subscribe((location: any) => this._location.next(location));
  }
  public getLocationOrderByDateDecision() {
    this.http.get(environment.ServerUrl + '/locationDateDecision').subscribe((location: any) => this._location.next(location));
  }
  public getlocationUtilisateur() {
    this.http.get(environment.ServerUrl + '/utilisateurs')
      .subscribe((utilisateurs: any) => this._utilisateurs.next(utilisateurs));
  }
  public LocationValide(id: number | undefined): Observable<any> {
    return this.http.get(environment.ServerUrl + '/locationvalide/' + id);
  }
  public LocationRefusee(id: number | undefined): Observable<any> {
    return this.http.get(environment.ServerUrl + '/locationrefusee/' + id);
  }
  public LocationUtilisateurtrue(id: number | undefined) {
    this.http.get(environment.ServerUrl + '/locationutilisateurtrue/' + id).subscribe((location: any) => this._location.next(location));
  }
  public LocationUtilisateurfalse(id: number | undefined) {
    this.http.get(environment.ServerUrl + '/locationutilisateurfalse/' + id).subscribe((location: any) => this._location.next(location));
  }
}

