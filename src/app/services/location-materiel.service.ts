import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class LocationMaterielService {
  public _locationmateriel: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  constructor(private http: HttpClient) { }
  public getLocationMateriel(idloc: number | undefined) {

    this.http.get(environment.serverUrl + '/locationmateriels/' + idloc).subscribe((locationmateriel: any) => this._locationmateriel.next(locationmateriel)
    );

  }
}
