import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModeleService } from 'src/app/services/materiel/modele.service';
import { modele } from 'src/app/models/materiel/modele';
import { MarqueService } from 'src/app/services/materiel/marque.service';

@Component({
  selector: 'app-modele',
  templateUrl: './modele.component.html',
  styleUrls: ['./modele.component.scss']
})
export class ModeleComponent {
  formulaire: FormGroup = this.formBuilder.group({
    id: [""],
    nom: ["", Validators.required],
    marque: ["", Validators.required],
  })
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private serviceModele: ModeleService,
    private serviceMarque: MarqueService
  ) { }

  idModele: any;
  isCreation: boolean = true;
  listeMarque: any[] = [];

  ngOnInit() {
    this.serviceMarque.getMarques().subscribe({
      next: listeMarque => this.listeMarque = listeMarque,

    });
    this.route.params.subscribe(
      parametres => {
        this.idModele = parametres['id'];
        if (this.idModele != "nouveau") {
          this.isCreation = false;
          this.serviceModele
            .getModele(this.idModele)
            .subscribe({
              next: (Modele: modele) => {
                this.formulaire.get("id")?.setValue(Modele.id);
                this.formulaire.get("nom")?.setValue(Modele.nom);
              }
            })
        }
      })
  }
  compareMarque(MarqueOption: any, MarqueMateriel: any) {
    return MarqueMateriel != null && MarqueMateriel.nomMarque == MarqueOption.nomMarque;
  }

  onSubmit() {


    if (this.formulaire.valid) {
      this.serviceModele.editionModele(this.formulaire.value).subscribe(resultat => {

      })
      this.router.navigate(['/materiels'])
    } else {
      console.log("formulaire non valide ");
    }
  }
}
