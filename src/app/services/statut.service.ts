import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { statut } from '../models/statut';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatutService {
  public _statut: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  constructor(private http: HttpClient) { }
  public getStatuts(): Observable<any> {
    return this.http.get<statut>(environment.ServerUrl + "/statuts");
  }

  public deleteStatut(id: number): Observable<any> {
    return this.http.delete(environment.ServerUrl + "/statut/" + id);
  }

  public editionStatut(statut: any): Observable<any> {
    return this.http.post(environment.ServerUrl + "/statut", statut);
  }

  public getStatut(id: number): Observable<any> {
    return this.http.get(environment.ServerUrl + "/statut/" + id);
  }
}
