import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationService } from 'src/app/services/location.service';
import { location } from 'src/app/models/location';
import { categorie } from 'src/app/models/materiel/categorie';
import { ConnexionService } from 'src/app/services/connexion.service';
import { CategorieService } from 'src/app/services/materiel/categorie.service';

@Component({
  selector: 'app-location-details',
  templateUrl: './location-details.component.html',
  styleUrls: ['./location-details.component.scss']
})
export class LocationDetailsComponent {

  formulaire: FormGroup = this.formBuilder.group({
    id: [""],
    utilisateur: [""],
    dateDemandeLocation: ["", Validators.required],
    dateDebutLocationPrevue: ["", Validators.required],
    dateFinLocationPrevue: ["", Validators.required],
    raisonLocation: ["", Validators.required],
    decision: [""],
    categorie: [""],
  })

  constructor(
    private formBuilder: FormBuilder,
    public connexionService: ConnexionService,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private serviceLocation: LocationService,
    private serviceCategorie: CategorieService,
  ) { }

  idLocation: any;
  codeRetour: number = 0;
  messageErreur: string = "";
  listeCategorie: categorie[] = [];
  isCreation: boolean = true;

  ngOnInit() {
    this.serviceCategorie.getCategories().subscribe({
      next: listeCategorie => this.listeCategorie = listeCategorie,

    });
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
                this.formulaire.get("utilisateur")?.setValue(location.utilisateur);
                this.formulaire.get("dateDemandeLocation")?.setValue(location.dateDemandeLocation);
                this.formulaire.patchValue({
                  dateDebutLocationPrevue: new Date(location.dateDebutLocationPrevue).toISOString().substring(0, 10)
                });
                this.formulaire.patchValue({
                  dateFinLocationPrevue: new Date(location.dateFinLocationPrevue).toISOString().substring(0, 10)
                });
                this.formulaire.get("raisonLocation")?.setValue(location.raisonLocation);
                this.formulaire.get("decision")?.setValue(location.decision);

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
  compareCategorie(categorieOption: any, CategorieMateriel: any) {
    return CategorieMateriel != null && CategorieMateriel.id == categorieOption.id;
  }

  onSubmit() {


    if (this.formulaire.valid) {
      this.serviceLocation.editionlocation(this.formulaire.value).subscribe(resultat => {

      })
      this.router.navigate(['/accueil'])
    } else {
      console.log("formulaire non valide");

    }
  }
}
