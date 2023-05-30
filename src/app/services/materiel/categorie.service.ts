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
  public getcategories(): Observable<any> {
    return this.http.get<categorie>('http://localhost:8080/categories');
  }

  public deletecategorie(id: number): Observable<any> {
    return this.http.delete("http://localhost:8080/categorie/" + id);
  }

  public editioncategorie(categorie: any): Observable<any> {
    return this.http.post("http://localhost:8080/categorie", categorie);
  }

  public getcategorie(id: number): Observable<any> {
    return this.http.get("http://localhost:8080/categorie/" + id);
  }
}
