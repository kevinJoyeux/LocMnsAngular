import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { modele } from '../../models/materiel/modele';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ModeleService {
  public _modele: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  constructor(private http: HttpClient) { }
  public getModeles(): Observable<any> {
    return this.http.get<modele>(environment.ServerUrl + "/modeles");
  }

  public deleteModele(id: number): Observable<any> {
    return this.http.delete(environment.ServerUrl + "/modele/" + id);
  }

  public editionModele(modele: any): Observable<any> {
    return this.http.post(environment.ServerUrl + "/modele", modele);
  }

  public getModele(id: number): Observable<any> {
    return this.http.get(environment.ServerUrl + "/modele/" + id);
  }
}
