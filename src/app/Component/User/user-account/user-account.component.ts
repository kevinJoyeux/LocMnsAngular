import { Component, SimpleChange, Input } from '@angular/core';
import { utilisateur } from '../../../models/utilisateur';
import { ConnexionService } from '../../../services/connexion.service';
import { UtilisateurService } from '../../../services/utilisateur.service';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss']
})
export class UserAccountComponent {
  listeUtilisateur: utilisateur[] = [];
  isAdmin: boolean = false;
  listeTrie = ["Nom", "Prenom", "Sexe", "Statut"];
  recherche: string = "";

  constructor(public connexionService: ConnexionService, private serviceUtilisateur: UtilisateurService) {
  }

  ngOnInit() {
    this.rafraichir();
  }

  rafraichir() {
    if (this.connexionService.isAdmin) {
      this.serviceUtilisateur.getUtilisateurs();
      this.serviceUtilisateur._utilisateurs.subscribe(
        utilisateurs => {
          this.listeUtilisateur = utilisateurs;
        })
    }
  }

  OnTrieChange(event: any) {
    const changes = event.target.value;
    switch (changes) {
      case "Nom":
        this.serviceUtilisateur.getUtilisateursOrderByNom();
        this.serviceUtilisateur._utilisateurs.subscribe(
          utilisateurs => {
            this.listeUtilisateur = utilisateurs;
          })
        break;
      case "Prenom":
        this.serviceUtilisateur.getUtilisateursOrderByPrenom();
        this.serviceUtilisateur._utilisateurs.subscribe(
          utilisateurs => {
            this.listeUtilisateur = utilisateurs;
          })
        break;
      case "Statut":
        this.serviceUtilisateur.getUtilisateursOrderByStatut();
        this.serviceUtilisateur._utilisateurs.subscribe(
          utilisateurs => {
            this.listeUtilisateur = utilisateurs;
          })
        break;
      case "Sexe":
        this.serviceUtilisateur.getUtilisateursOrderBySexe();
        this.serviceUtilisateur._utilisateurs.subscribe(
          utilisateurs => {
            this.listeUtilisateur = utilisateurs;
          })
        break;

      default: this.serviceUtilisateur.getUtilisateurs();
        this.serviceUtilisateur._utilisateurs.subscribe(
          utilisateurs => {
            this.listeUtilisateur = utilisateurs;
          })
        break;
    }

  }
  Recherche() {
    this.serviceUtilisateur.getUtilisateursRecherche(this.recherche);
    this.serviceUtilisateur._utilisateurs.subscribe(
      utilisateurs => {
        this.listeUtilisateur = utilisateurs;
      })
  }

  onDeleteUser(idUtilisateur: number | undefined) {
    if (idUtilisateur != undefined) {
      this.serviceUtilisateur.deleteUtilisateur(idUtilisateur).subscribe(utilisateur => this.rafraichir());
    }
  }
}
