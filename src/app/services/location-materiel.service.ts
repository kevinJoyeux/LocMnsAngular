import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationMaterielService {
  public _locationmateriel: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  constructor(private http: HttpClient) { }
  public getLocationMateriel(idloc: number | undefined) {

    this.http.get('http://localhost:8080/locationmateriels/' + idloc).subscribe((locationmateriel: any) => this._locationmateriel.next(locationmateriel)
    );

  }
}
