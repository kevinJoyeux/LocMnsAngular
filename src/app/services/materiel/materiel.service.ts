import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MaterielService {

  public _materiels: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  constructor(private http: HttpClient) { }

  public getMateriels() {
    this.http.get('http://localhost:8080/materiels')
      .subscribe((materiels: any) => this._materiels.next(materiels));
  }

  public getMateriel(id: number): Observable<any> {
    return this.http.get('http://localhost:8080/materiel/' + id)
  }

  public ajoutMateriel(materiel: any): Observable<any> {
    return this.http.post('http://localhost:8080/materiel', materiel);
  }

  public deleteMateriel(id: number): Observable<any> {
    return this.http.delete('http://localhost:8080/materiel/' + id);
  }

  public getMaterielRecherche(texte: string) {
    if (texte != "") {
      this.http.get("http://localhost:8080/materielRecherche/" + texte)
        .subscribe((materiel: any) => this._materiels.next(materiel));
    } else {
      this.http.get('http://localhost:8080/materiels')
        .subscribe((materiel: any) => this._materiels.next(materiel));
    }
  }
}
