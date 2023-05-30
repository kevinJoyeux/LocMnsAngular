import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { statut } from '../models/statut';

@Injectable({
  providedIn: 'root'
})
export class StatutService {
  public _statut: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  constructor(private http: HttpClient) { }
  public getStatuts(): Observable<any> {
    return this.http.get<statut>('http://localhost:8080/statuts');
  }

  public deleteStatut(id: number): Observable<any> {
    return this.http.delete("http://localhost:8080/statut/" + id);
  }

  public editionStatut(statut: any): Observable<any> {
    return this.http.post("http://localhost:8080/statut", statut);
  }

  public getStatut(id: number): Observable<any> {
    return this.http.get("http://localhost:8080/statut/" + id);
  }
}
