import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { categorie } from 'src/app/models/materiel/categorie';
import { utilisateur } from 'src/app/models/utilisateur';
import { LocationService } from 'src/app/services/location.service';
import { CategorieService } from 'src/app/services/materiel/categorie.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-demande-location',
  templateUrl: './demande-location.component.html',
  styleUrls: ['./demande-location.component.scss']
})
export class DemandeLocationComponent {

  formulaire: FormGroup = this.formBuilder.group({
    id: [""],
    utilisateur: [""],
    dateDemandeLocation: [""],
    nom: ["", Validators.required],
    prenom: ["", Validators.required],
    categorie: ["", Validators.required],
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
    private serviceCategorie: CategorieService,
    private serviceUtilisateur: UtilisateurService
  ) { }

  idLocation: any;
  codeRetour: number = 0;
  messageErreur: string = "";
  listeCategorie: categorie[] = [];
  isCreation: boolean = true;
  listeUtilisateur: utilisateur[] = [];

  ngOnInit() {
    this.serviceCategorie.getCategories().subscribe({
      next: listeCategorie => this.listeCategorie = listeCategorie,
      error: erreur => console.log(erreur)
    });
  }
  compareCategorie(categorieOption: any, CategorieMateriel: any) {
    return CategorieMateriel != null && CategorieMateriel.id == categorieOption.id;
  }

  onSubmit() {

    if (this.formulaire.valid) {
      const date = new Date();
      var format = date.toISOString().split('T')[0];
      this.formulaire.get("dateDemandeLocation")?.setValue(format);
      let resultat: any = "";
      this.serviceUtilisateur.getUtilisateursByPrenomAndNom(this.formulaire.get("prenom")?.value, this.formulaire.get("nom")?.value).subscribe({
        next: listeUtilisateur => {
          resultat = listeUtilisateur[0];
          this.formulaire.get("utilisateur")?.setValue(resultat);
          this.serviceLocation.editionlocation(this.formulaire.value).subscribe(resultat => {
            console.log(resultat);
          })
        }
      });
      this.router.navigate(['/accueil'])
    } else {
      console.log("formulaire non valide");

    }
  }
}
