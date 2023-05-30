import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterielService } from '../services/materiel/materiel.service';
import { materiel } from '../models/materiel/materiel';
import { LieuStockageService } from '../services/materiel/lieu-stockage.service';
import { CategorieService } from '../services/materiel/categorie.service';
import { ModeleService } from '../services/materiel/modele.service';

@Component({
  selector: 'app-materiel-details',
  templateUrl: './materiel-details.component.html',
  styleUrls: ['./materiel-details.component.scss']
})
export class MaterielDetailsComponent {

  formulaire: FormGroup = this.formBuilder.group({
    matricule: ["", [Validators.required]],
    modele: ["", [Validators.required]],
    lieuStockage: ["", Validators.required],
    categorie: ["", Validators.required]
  })

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private serviceMateriel: MaterielService,
    private serviceCategorie: CategorieService,
    private serviceModele: ModeleService,
    private serviceLieuStockage: LieuStockageService
  ) { }

  idMateriel: any;
  codeRetour: number = 0;
  messageErreur: string = "";
  listeCategorie: any[] = [];
  listeLieuStockage: any[] = [];
  listeModele: any[] = [];
  isCreation: boolean = true;

  ngOnInit() {
    this.serviceCategorie.getcategories().subscribe({
      next: listeCategorie => this.listeCategorie = listeCategorie,
      error: erreur => console.log(erreur)
    });
    this.serviceModele.getmodeles().subscribe({
      next: listeModele => this.listeModele = listeModele,
      error: erreur => console.log(erreur)
    });
    this.serviceLieuStockage.getlieuStockages().subscribe({
      next: listelieustockage => this.listeLieuStockage = listelieustockage,
      error: erreur => console.log(erreur)
    });
    this.route.params.subscribe(
      parametres => {
        this.idMateriel = parametres['id'];
        if (this.idMateriel != "nouveau") {
          this.isCreation = false;
          this.serviceMateriel
            .getMateriel(this.idMateriel)
            .subscribe({
              next: (materiel: materiel) => {
                this.formulaire.get("matricule")?.setValue(materiel.matricule)
                this.formulaire.get("modele")?.setValue(materiel.modele.nom)
                this.formulaire.get("lieuStockage")?.setValue(materiel.lieuStockage.lieuStockage)
                this.formulaire.get("categorie")?.setValue(materiel.categorie.nomCategorie)
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
      });
  }



  // checker si dans onSubmit il faut mettre ajoutMateriel ou updateMateriel (+ si jamais il faut faire le updateMateriel dans SPRING)

  onSubmit() {
    if (this.formulaire.valid) {
      const formData = new FormData();
      const materiel: materiel = this.formulaire.value;
      materiel.id = this.idMateriel;

      formData.append('materiel', new Blob([JSON.stringify(materiel)], {
        type: 'application/json',
      }));

      this.serviceMateriel.ajoutMateriel(formData).subscribe(resultat => this.router.navigateByUrl("accueil"))
    }
  }
}
