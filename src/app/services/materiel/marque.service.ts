import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { marque } from '../../models/materiel/marque';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MarqueService {
  public _marque: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  constructor(private http: HttpClient) { }
  public getMarques(): Observable<any> {
    return this.http.get<marque>(environment.ServerUrl + "/marques");
  }

  public deleteMarque(id: number): Observable<any> {
    return this.http.delete(environment.ServerUrl + "/marque/" + id);
  }

  public editionMarque(marque: any): Observable<any> {
    return this.http.post(environment.ServerUrl + "/marque", marque);
  }

  public getMarque(id: number): Observable<any> {
    return this.http.get(environment.ServerUrl + "/marque/" + id);
  }
}
