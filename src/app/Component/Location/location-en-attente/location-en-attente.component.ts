import { Component } from '@angular/core';
import { location } from 'src/app/models/location';
import { ConnexionService } from 'src/app/services/connexion.service';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-location-en-attente',
  templateUrl: './location-en-attente.component.html',
  styleUrls: ['./location-en-attente.component.scss']
})
export class LocationEnAttenteComponent {
  listeLocation: location[] = [];
  isAdmin: boolean = false;
  listeTrie = ["Date de début", "Date de fin", "Date de prolongation", "Date de décision"];

  constructor(private connexionService: ConnexionService, private ServiceLocation: LocationService) {

  }

  ngOnInit() {
    this.rafraichir();
  }

  rafraichir() {
    if (this.connexionService.isAdmin) {
      this.ServiceLocation.getLocationAttente();
      this.ServiceLocation._location.subscribe(
        location => {
          this.listeLocation = location;
        })
    }
  }
  onTrieChange(event: any) {
    const changes = event.target.value;
    switch (changes) {
      case "Date de début":
        this.ServiceLocation.getLocationOrderByDateDebutLocationPrevue();
        this.ServiceLocation._location.subscribe(
          Locations => {
            this.listeLocation = Locations;
          })
        break;
      case "Date de fin":
        this.ServiceLocation.getLocationOrderByDateFinLocationPrevue();
        this.ServiceLocation._location.subscribe(
          Locations => {
            this.listeLocation = Locations;
          })
        break;
      case "Date de prolongation":
        this.ServiceLocation.getLocationOrderByDateProlongation();
        this.ServiceLocation._location.subscribe(
          Locations => {
            this.listeLocation = Locations;
          })
        break;
      case "Date de décision":
        this.ServiceLocation.getLocationOrderByDateDecision();
        this.ServiceLocation._location.subscribe(
          Locations => {
            this.listeLocation = Locations;
          })
        break;
      default:
        break;
    }
  }
}
