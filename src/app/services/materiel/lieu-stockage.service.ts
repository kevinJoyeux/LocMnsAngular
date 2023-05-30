import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { lieuStockage } from 'src/app/models/materiel/lieuStockage';

@Injectable({
  providedIn: 'root'
})
export class LieuStockageService {
  public _lieuStockage: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  constructor(private http: HttpClient) { }
  public getlieuStockages(): Observable<any> {
    return this.http.get<lieuStockage>('http://localhost:8080/lieustockages');
  }

  public deletelieuStockage(id: number): Observable<any> {
    return this.http.delete("http://localhost:8080/lieustockage/" + id);
  }

  public editionlieuStockage(lieuStockage: any): Observable<any> {
    return this.http.post("http://localhost:8080/lieustockage", lieuStockage);
  }

  public getlieuStockage(id: number): Observable<any> {
    return this.http.get("http://localhost:8080/lieustockage/" + id);
  }
}
