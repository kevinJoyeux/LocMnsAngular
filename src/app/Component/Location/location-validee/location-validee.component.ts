import { Component } from '@angular/core';
import { location } from 'src/app/models/location';
import { utilisateur } from 'src/app/models/utilisateur';
import { LocationService } from 'src/app/services/location.service';
import { ConnexionService } from 'src/app/services/connexion.service';
import { locationMateriel } from 'src/app/models/locationMateriel';
import { LocationMaterielService } from 'src/app/services/location-materiel.service';

@Component({
  selector: 'app-location-validee',
  templateUrl: './location-validee.component.html',
  styleUrls: ['./location-validee.component.scss']
})
export class LocationValideeComponent {
  listeLocation: location[] = [];
  isAdmin: boolean = false;
  listeUtilisateurs: utilisateur[] = [];
  listeTrie = ["Date de début", "Date de fin", "Date de prolongation", "Date de décision"];
  listeLocationMateriel: locationMateriel[] = [];
  constructor(public connexionService: ConnexionService, private ServiceLocation: LocationService, private ServiceLocationMateriel: LocationMaterielService) {

  }

  ngOnInit() {
    if (this.connexionService.isAdmin) {
      this.rafraichirAdmin();
    } else {
      this.rafraichirUser();
    }
  }

  rafraichirAdmin() {
    this.ServiceLocation.getLocationValidee();
    this.ServiceLocation._location.subscribe(
      location => {
        this.listeLocation = location;
      })
    this.ServiceLocation.getlocationUtilisateur();
    this.ServiceLocation._utilisateurs.subscribe(
      utilisateur => {
        this.listeUtilisateurs = utilisateur;
      }
    )
  }

  rafraichirUser() {
    this.ServiceLocation.getlocationUtilisateur();
    this.ServiceLocation._utilisateurs.subscribe(utilisateur => {
      this.listeUtilisateurs = utilisateur;
    });
    this.ServiceLocation.LocationUtilisateurtrue(this.connexionService.id);

    this.ServiceLocation._location.subscribe(location => {
      this.listeLocation = location;
      location.forEach((element: location) => {
        this.ServiceLocationMateriel.getLocationMateriel(element.id);
        this.ServiceLocationMateriel._locationmateriel.subscribe(locationmateriel => {
          this.listeLocationMateriel.push(locationmateriel);
        });
      });
    });
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
  OnRefuseLocation(id: number | undefined) {
    this.ServiceLocation.LocationRefusee(id).subscribe(location => this.rafraichirAdmin());
  }
}

