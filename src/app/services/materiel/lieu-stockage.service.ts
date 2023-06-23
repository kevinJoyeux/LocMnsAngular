import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { lieuStockage } from 'src/app/models/materiel/lieuStockage';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class LieuStockageService {
  public _lieuStockage: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  constructor(private http: HttpClient) { }
  public getlieuStockages(): Observable<any> {
    return this.http.get<lieuStockage>(environment.serverUrl + "/lieustockages");
  }

  public deletelieuStockage(id: number): Observable<any> {
    return this.http.delete(environment.serverUrl + "/lieustockage/" + id);
  }

  public editionlieuStockage(lieuStockage: any): Observable<any> {
    return this.http.post(environment.serverUrl + "/lieustockage", lieuStockage);
  }

  public getlieuStockage(id: number): Observable<any> {
    return this.http.get(environment.serverUrl + "/lieustockage/" + id);
  }
}
