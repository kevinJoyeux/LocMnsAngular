import { Component } from '@angular/core';
import { utilisateur } from '../../models/utilisateur';
import { ConnexionService } from '../../services/connexion.service';
import { UtilisateurService } from '../../services/utilisateur.service';

@Component({
  selector: 'app-informations-personnelles',
  templateUrl: './informations-personnelles.component.html',
  styleUrls: ['./informations-personnelles.component.scss']
})
export class InformationsPersonnellesComponent {


  listeUtilisateur: utilisateur[] = [];
  user: any;

  constructor(private connexionService: ConnexionService, private serviceUtilisateur: UtilisateurService) { }

  ngOnInit() {
    this.rafraichir();
  }
  rafraichir() {
    this.connexionService._utilisateurConnecte.subscribe(
      (utilisateur) => (this.user = utilisateur)
    );


  }

}