import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationService } from 'src/app/services/location.service';
import { location } from 'src/app/models/location';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-location-details',
  templateUrl: './location-details.component.html',
  styleUrls: ['./location-details.component.scss']
})
export class LocationDetailsComponent {

  formulaire: FormGroup = this.formBuilder.group({
    id: [""],
    //dateDemande: ["", Validators.required],
    dateDebutLocationPrevue: ["", Validators.required],
    dateFinLocationPrevue: ["", Validators.required],
    raisonLocation: ["", Validators.required],
    decision: ["false"],
  })

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private serviceLocation: LocationService,
  ) { }

  idLocation: any;
  codeRetour: number = 0;
  messageErreur: string = "";

  isCreation: boolean = true;

  ngOnInit() {
    this.route.params.subscribe(
      parametres => {
        this.idLocation = parametres['id'];
        if (this.idLocation != "nouveau") {
          this.isCreation = false;
          this.serviceLocation
            .getlocation(this.idLocation)
            .subscribe({
              next: (location: location) => {
                this.formulaire.get("id")?.setValue(location.id);
                this.formulaire.patchValue({
                  dateDebutLocationPrevue: new Date(location.dateDebutLocationPrevue).toISOString().substring(0, 10)
                });
                this.formulaire.patchValue({
                  dateFinLocationPrevue: new Date(location.dateFinLocationPrevue).toISOString().substring(0, 10)
                });
                this.formulaire.get("raisonLocation")?.setValue(location.raisonLocation);
                console.log(this.formulaire.get("raisonLocation")?.value);
                console.log(this.formulaire.get("DateFinLocationPrevue")?.value);
              },
              error: erreurRequete => {
                if (erreurRequete.status === 404) {
                  this.codeRetour = 404
                } else {
                  this.codeRetour = 500
                  this.messageErreur = erreurRequete.messageErreur
                }
              },
            });
        }
      })
  }

  onSubmit() {

    console.log(this.formulaire.value);

    if (this.formulaire.valid) {
      this.serviceLocation.editionlocation(this.formulaire.value).subscribe(resultat => {
        console.log(resultat);
      })
      this.router.navigate(['/accueil'])
    } else {
      console.log("eh bah non");

    }
  }
}
