import { Component } from '@angular/core';
import { materiel } from '../../../models/materiel/materiel';
import { ConnexionService } from '../../../services/connexion.service';
import { MaterielService } from '../../../services/materiel/materiel.service';

@Component({
  selector: 'app-materiel',
  templateUrl: './materiel.component.html',
  styleUrls: ['./materiel.component.scss']
})
export class MaterielComponent {

  listeMateriel: materiel[] = [];
  isAdmin: boolean = false;
  recherche: string = "";

  constructor(public connexionService: ConnexionService, private serviceMateriel: MaterielService) {

  }

  ngOnInit() {
    this.rafraichir();

  }

  rafraichir() {
    this.serviceMateriel.getMateriels();
    this.serviceMateriel._materiels.subscribe(
      materiels => {
        this.listeMateriel = materiels;
      })
  }
  Recherche() {
    this.serviceMateriel.getMaterielRecherche(this.recherche);
    this.serviceMateriel._materiels.subscribe(
      materiels => {
        this.listeMateriel = materiels;
      })
  }

  onDeleteMateriel(idMateriel: number | undefined) {
    if (idMateriel != undefined) {
      this.serviceMateriel.deleteMateriel(idMateriel).subscribe(materiel => this.rafraichir());
    }
  }
}
