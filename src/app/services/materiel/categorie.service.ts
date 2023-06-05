import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { categorie } from '../../models/materiel/categorie';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {
  public _categorie: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  constructor(private http: HttpClient) { }
  public getCategories(): Observable<any> {
    return this.http.get<categorie>('http://localhost:8080/categories');
  }

  public deleteCategorie(id: number): Observable<any> {
    return this.http.delete("http://localhost:8080/categorie/" + id);
  }

  public editionCategorie(categorie: any): Observable<any> {
    return this.http.post("http://localhost:8080/categorie", categorie);
  }

  public getCategorie(id: number): Observable<any> {
    return this.http.get("http://localhost:8080/categorie/" + id);
  }
}
