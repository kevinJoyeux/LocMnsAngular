import { Component } from '@angular/core';
import { location } from 'src/app/models/location';
import { ConnexionService } from 'src/app/services/connexion.service';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-location-validee',
  templateUrl: './location-validee.component.html',
  styleUrls: ['./location-validee.component.scss']
})
export class LocationValideeComponent {
  listeLocation: location[] = [];
  isAdmin: boolean = false;

  constructor(private connexionService: ConnexionService, private serviceLocation: LocationService) {

  }

  ngOnInit() {
    this.rafraichir();
  }

  rafraichir() {
    if (this.connexionService.isAdmin) {
      this.serviceLocation.getLocationValidee();
      this.serviceLocation._location.subscribe(
        location => {
          this.listeLocation = location;
        })
    }
  }

  /*onDeleteMateriel(idMateriel: number | undefined) {
    if (idMateriel != undefined) {
      this.serviceMateriel.deleteMateriel(idMateriel).subscribe(materiel => this.rafraichir());
    }
  }*/
}

