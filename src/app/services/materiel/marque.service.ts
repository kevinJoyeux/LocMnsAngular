import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { marque } from '../../models/materiel/marque';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class MarqueService {
  public _marque: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  constructor(private http: HttpClient) { }
  public getMarques(): Observable<any> {
    return this.http.get<marque>(environment.serverUrl + "/marques");
  }

  public deleteMarque(id: number): Observable<any> {
    return this.http.delete(environment.serverUrl + "/marque/" + id);
  }

  public editionMarque(marque: any): Observable<any> {
    return this.http.post(environment.serverUrl + "/marque", marque);
  }

  public getMarque(id: number): Observable<any> {
    return this.http.get(environment.serverUrl + "/marque/" + id);
  }
}
