import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { marque } from '../../models/materiel/marque';

@Injectable({
  providedIn: 'root'
})
export class MarqueService {
  public _marque: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  constructor(private http: HttpClient) { }
  public getMarques(): Observable<any> {
    return this.http.get<marque>('http://localhost:8080/marques');
  }

  public deleteMarque(id: number): Observable<any> {
    return this.http.delete("http://localhost:8080/marque/" + id);
  }

  public editionMarque(marque: any): Observable<any> {
    return this.http.post("http://localhost:8080/marque", marque);
  }

  public getMarque(id: number): Observable<any> {
    return this.http.get("http://localhost:8080/marque/" + id);
  }
}
