import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MaterielService {

  public _materiels: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  constructor(private http: HttpClient) { }

  public getMateriels() {
    this.http.get(environment.serverUrl + '/materiels')
      .subscribe((materiels: any) => this._materiels.next(materiels));
  }

  public getMateriel(id: number): Observable<any> {
    return this.http.get(environment.serverUrl + '/materiel/' + id)
  }

  public ajoutMateriel(materiel: any): Observable<any> {
    return this.http.post(environment.serverUrl + '/materiel', materiel);
  }

  public deleteMateriel(id: number): Observable<any> {
    return this.http.delete(environment.serverUrl + '/materiel/' + id);
  }

  public getMaterielRecherche(texte: string) {
    if (texte != "") {
      this.http.get(environment.serverUrl + '/materielRecherche/' + texte)
        .subscribe((materiel: any) => this._materiels.next(materiel));
    } else {
      this.http.get(environment.serverUrl + '/materiels')
        .subscribe((materiel: any) => this._materiels.next(materiel));
    }
  }
}
