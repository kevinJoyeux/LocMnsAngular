import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { utilisateur } from '../models/utilisateur';
import jwt_decode from 'jwt-decode';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConnexionService {

  isAdmin: boolean = false;
  id: number | undefined = 0;

  public _utilisateurConnecte: BehaviorSubject<utilisateur | null> =
    new BehaviorSubject<utilisateur | null>(null);

  constructor(
    private http: HttpClient,
    private router: Router) {
    this.updateUserConnected();
  }

  connexion(utilisateur: utilisateur): Observable<string> {
    return this.http
      .post(environment.ServerUrl + '/connexion', utilisateur, {
        responseType: 'text',
      })
  }

  updateUserConnected() {
    const jwt = localStorage.getItem("jwt")
    if (jwt != null) {
      const donneesUtilisateur: any = jwt_decode(jwt);
      const data = jwt.split('.')[1];
      const json = window.atob(data);
      const utilisateur: utilisateur = {
        id: donneesUtilisateur.utilisateur.id,
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
      this.id = utilisateur.id;

      this._utilisateurConnecte.next(utilisateur);
    } else {
      this._utilisateurConnecte.next(null);
    }

  }

  deconnexion() {
    localStorage.removeItem("jwt");
    this._utilisateurConnecte.next(null);
    this.router.navigateByUrl('/connexion');
  }

}
