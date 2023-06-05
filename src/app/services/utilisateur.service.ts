import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { utilisateur } from '../models/utilisateur';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  public _utilisateurs: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  constructor(private http: HttpClient) { }

  public getUtilisateurs() {
    this.http.get('http://localhost:8080/utilisateurs')
      .subscribe((utilisateurs: any) => this._utilisateurs.next(utilisateurs));
  }

  public deleteUtilisateur(id: number): Observable<any> {
    return this.http.delete("http://localhost:8080/utilisateur/" + id);
  }

  public editionUtilisateur(utilisateur: any): Observable<any> {
    return this.http.post("http://localhost:8080/utilisateur", utilisateur);
  }

  public getUtilisateur(id: number): Observable<any> {
    return this.http.get("http://localhost:8080/utilisateur/" + id);
  }
  public getUtilisateursOrderByPrenom() {
    this.http.get('http://localhost:8080/utilisateurPrenom')
      .subscribe((utilisateurs: any) => this._utilisateurs.next(utilisateurs));
  }
  public getUtilisateursOrderByNom() {
    this.http.get('http://localhost:8080/utilisateurNom')
      .subscribe((utilisateurs: any) => this._utilisateurs.next(utilisateurs));
  }
  public getUtilisateursOrderByStatut() {
    this.http.get('http://localhost:8080/utilisateurStatut')
      .subscribe((utilisateurs: any) => this._utilisateurs.next(utilisateurs));
  }
  public getUtilisateursOrderBySexe() {
    this.http.get('http://localhost:8080/utilisateurSexe')
      .subscribe((utilisateurs: any) => this._utilisateurs.next(utilisateurs));
  }
  public getUtilisateursRecherche(texte: string) {
    if (texte != "") {
      this.http.get("http://localhost:8080/utilisateurRecherche/" + texte)
        .subscribe((utilisateurs: any) => this._utilisateurs.next(utilisateurs));
    } else {
      this.http.get('http://localhost:8080/utilisateurs')
        .subscribe((utilisateurs: any) => this._utilisateurs.next(utilisateurs));
    }
  }

}
