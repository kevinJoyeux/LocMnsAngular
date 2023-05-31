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

  constructor(private connexionService: ConnexionService, private serviceMateriel: MaterielService) {

  }

  ngOnInit() {
    this.rafraichir();

  }

  rafraichir() {
    if (this.connexionService.isAdmin) {
      this.serviceMateriel.getMateriels();
      this.serviceMateriel._materiels.subscribe(
        materiels => {
          this.listeMateriel = materiels;
        })
    }
  }

  onDeleteMateriel(idMateriel: number | undefined) {
    if (idMateriel != undefined) {
      this.serviceMateriel.deleteMateriel(idMateriel).subscribe(materiel => this.rafraichir());
    }
  }
}