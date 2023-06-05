import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterielService } from '../../../services/materiel/materiel.service';
import { materiel } from '../../../models/materiel/materiel';
import { LieuStockageService } from '../../../services/materiel/lieu-stockage.service';
import { CategorieService } from '../../../services/materiel/categorie.service';
import { ModeleService } from '../../../services/materiel/modele.service';

@Component({
  selector: 'app-materiel-details',
  templateUrl: './materiel-details.component.html',
  styleUrls: ['./materiel-details.component.scss']
})
export class MaterielDetailsComponent {

  formulaire: FormGroup = this.formBuilder.group({
    id: [""],
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
    private serviceLieuStockage: LieuStockageService,
  ) { }

  idMateriel: any;
  codeRetour: number = 0;
  messageErreur: string = "";
  listeCategorie: any[] = [];
  listeLieuStockage: any[] = [];
  listeModele: any[] = [];

  isCreation: boolean = true;

  ngOnInit() {
    this.serviceCategorie.getCategories().subscribe({
      next: listeCategorie => this.listeCategorie = listeCategorie,
      error: erreur => console.log(erreur)
    });
    this.serviceModele.getModeles().subscribe({
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
                this.formulaire.get("id")?.setValue(materiel.id);
                this.formulaire.get("matricule")?.setValue(materiel.matricule)
                this.formulaire.get("modele")?.setValue(materiel.modele)
                this.formulaire.get("lieuStockage")?.setValue(materiel.lieuStockage)
                this.formulaire.get("categorie")?.setValue(materiel.categorie)
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
  compareModele(ModeleOption: any, ModeleMateriel: any) {
    return ModeleMateriel != null && ModeleMateriel.id == ModeleOption.id;
  }
  compareCategorie(CategorieOption: any, CategorieMateriel: any) {
    return CategorieMateriel != null && CategorieMateriel.id == CategorieOption.id;
  }
  compareLieuStockage(LieuStockageOption: any, LieuStockageMateriel: any) {
    return LieuStockageMateriel != null && LieuStockageMateriel.id == LieuStockageOption.id;
  }



  // checker si dans onSubmit il faut mettre ajoutMateriel ou updateMateriel (+ si jamais il faut faire le updateMateriel dans SPRING)

  onSubmit() {
    console.log(this.formulaire.value);

    if (this.formulaire.valid) {
      this.serviceMateriel.ajoutMateriel(this.formulaire.value).subscribe(resultat => {
        console.log(resultat);
      })
      this.router.navigate(['/materiels'])
    } else {
      console.log("eh bah non");

    }
  }
}
