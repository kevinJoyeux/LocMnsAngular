import { Component } from '@angular/core';
import { location } from 'src/app/models/location';
import { locationMateriel } from 'src/app/models/locationMateriel';
import { utilisateur } from 'src/app/models/utilisateur';
import { ConnexionService } from 'src/app/services/connexion.service';
import { LocationMaterielService } from 'src/app/services/location-materiel.service';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-location-en-attente',
  templateUrl: './location-en-attente.component.html',
  styleUrls: ['./location-en-attente.component.scss']
})
export class LocationEnAttenteComponent {
  listeLocation: location[] = [];
  listeUtilisateurs: utilisateur[] = [];
  isAdmin: boolean = false;
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
    this.ServiceLocation.getLocationAttente();
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
    this.ServiceLocation.LocationUtilisateurfalse(this.connexionService.id);

    this.ServiceLocation._location.subscribe(location => {
      this.listeLocation = location;
      location.forEach((element: location) => {
        console.log(element.id);

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
  onDeleteLocation(id: number | undefined) {
    if (id != undefined) {
      this.ServiceLocation.deletelocation(id).subscribe(location => this.rafraichirAdmin());
    }
  }
  onValidationLocation(id: number | undefined) {
    this.ServiceLocation.LocationValide(id).subscribe(location => this.rafraichirAdmin());
  }
}
