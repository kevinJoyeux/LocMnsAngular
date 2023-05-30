import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { utilisateur } from '../models/utilisateur';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class ConnexionService {

  isAdmin: boolean = false;

  public _utilisateurConnecte: BehaviorSubject<utilisateur | null> =
    new BehaviorSubject<utilisateur | null>(null);

  constructor(
    private http: HttpClient,
    private router: Router) {
    this.updateUserConnected();
  }

  connexion(utilisateur: utilisateur): Observable<string> {
    return this.http
      .post('http://localhost:8080/connexion', utilisateur, {
        responseType: 'text',
      })
  }

  updateUserConnected() {
    const jwt = localStorage.getItem("jwt")
    if (jwt != null) {
      const donneesUtilisateur: any = jwt_decode(jwt);
      const data = jwt.split('.')[1];
      const json = window.atob(data);
      console.log(donneesUtilisateur);
      const utilisateur: utilisateur = {
        email: donneesUtilisateur.utilisateur.email,
        nom: donneesUtilisateur.utilisateur.nom,
        prenom: donneesUtilisateur.utilisateur.prenom,
        statut: donneesUtilisateur.utilisateur.statut,
        login: donneesUtilisateur.utilisateur.login,
        sexe: donneesUtilisateur.utilisateur.sexe,
        affiliation: donneesUtilisateur.utilisateur.affiliation,
        portable: donneesUtilisateur.utilisateur.portable,
        motDePasse: donneesUtilisateur.utilisateur.motDePasse,
      };
      this.isAdmin = utilisateur?.statut.nomStatut == "administrateur"
      this._utilisateurConnecte.next(utilisateur);
    } else {
      this._utilisateurConnecte.next(null);
    }
    console.log(this._utilisateurConnecte.getValue());

  }

  deconnexion() {
    localStorage.removeItem("jwt");
    this._utilisateurConnecte.next(null);
    this.router.navigateByUrl('/connexion');
  }

}
