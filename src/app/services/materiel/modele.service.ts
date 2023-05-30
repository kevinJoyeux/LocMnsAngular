import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { modele } from '../../models/materiel/modele';

@Injectable({
  providedIn: 'root'
})
export class ModeleService {
  public _modele: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  constructor(private http: HttpClient) { }
  public getmodeles(): Observable<any> {
    return this.http.get<modele>('http://localhost:8080/modeles');
  }

  public deletemodele(id: number): Observable<any> {
    return this.http.delete("http://localhost:8080/modele/" + id);
  }

  public editionmodele(modele: any): Observable<any> {
    return this.http.post("http://localhost:8080/modele", modele);
  }

  public getmodele(id: number): Observable<any> {
    return this.http.get("http://localhost:8080/modele/" + id);
  }
}