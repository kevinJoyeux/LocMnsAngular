import { Component } from '@angular/core';
import { utilisateur } from '../../models/utilisateur';
import { ConnexionService } from '../../services/connexion.service';
import { UtilisateurService } from '../../services/utilisateur.service';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss']
})
export class UserAccountComponent {
  listeUtilisateur: utilisateur[] = [];
  isAdmin: boolean = false;

  constructor(private connexionService: ConnexionService, private serviceUtilisateur: UtilisateurService) {
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

  onDeleteUser(idUtilisateur: number | undefined) {
    if (idUtilisateur != undefined) {
      this.serviceUtilisateur.deleteUtilisateur(idUtilisateur).subscribe(utilisateur => this.rafraichir());
    }
  }
}
