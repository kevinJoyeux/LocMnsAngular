import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { utilisateur } from '../models/utilisateur';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  public _utilisateurs: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  constructor(private http: HttpClient) { }

  public getUtilisateurs() {
    this.http.get(environment.serverUrl + "/utilisateurs")
      .subscribe((utilisateurs: any) => this._utilisateurs.next(utilisateurs));
  }

  public deleteUtilisateur(id: number): Observable<any> {
    return this.http.delete(environment.serverUrl + "/utilisateur/" + id);
  }

  public editionUtilisateur(utilisateur: any): Observable<any> {
    return this.http.post(environment.serverUrl + "/utilisateur", utilisateur);
  }

  public getUtilisateur(id: number): Observable<any> {
    return this.http.get(environment.serverUrl + "/utilisateur/" + id);
  }
  public getUtilisateursOrderByPrenom() {
    this.http.get(environment.serverUrl + "/utilisateurPrenom")
      .subscribe((utilisateurs: any) => this._utilisateurs.next(utilisateurs));
  }
  public getUtilisateursOrderByNom() {
    this.http.get(environment.serverUrl + "/utilisateurNom")
      .subscribe((utilisateurs: any) => this._utilisateurs.next(utilisateurs));
  }
  public getUtilisateursOrderByStatut() {
    this.http.get(environment.serverUrl + "/utilisateurStatut")
      .subscribe((utilisateurs: any) => this._utilisateurs.next(utilisateurs));
  }
  public getUtilisateursOrderBySexe() {
    this.http.get(environment.serverUrl + "/utilisateurSexe")
      .subscribe((utilisateurs: any) => this._utilisateurs.next(utilisateurs));
  }
  public getUtilisateursRecherche(texte: string) {
    if (texte != "") {
      this.http.get(environment.serverUrl + "/utilisateurRecherche/" + texte)
        .subscribe((utilisateurs: any) => this._utilisateurs.next(utilisateurs));
    } else {
      this.http.get(environment.serverUrl + "/utilisateurs")
        .subscribe((utilisateurs: any) => this._utilisateurs.next(utilisateurs));
    }
  }
  public getUtilisateursByPrenomAndNom(prenom: string, nom: string): Observable<utilisateur[]> {
    return this.http.get<utilisateur[]>(environment.serverUrl + "/utilisateur/" + prenom + "/" + nom);
  }
  public getUtilisateursByEmail(email: string): Observable<utilisateur[]> {
    return this.http.get<utilisateur[]>(environment.serverUrl + "/utilisateuremail/" + email);
  }

}
