import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { categorie } from '../../models/materiel/categorie';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {
  public _categorie: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  constructor(private http: HttpClient) { }
  public getCategories(): Observable<any> {
    return this.http.get<categorie>(environment.serverUrl + "/categories");
  }

  public deleteCategorie(id: number): Observable<any> {
    return this.http.delete(environment.serverUrl + "/categorie/" + id);
  }

  public editionCategorie(categorie: any): Observable<any> {
    return this.http.post(environment.serverUrl + "/categorie", categorie);
  }

  public getCategorie(id: number): Observable<any> {
    return this.http.get(environment.serverUrl + "/categorie/" + id);
  }
}
