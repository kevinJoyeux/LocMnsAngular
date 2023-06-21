import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CategorieService } from 'src/app/services/materiel/categorie.service';
import { categorie } from 'src/app/models/materiel/categorie';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.scss']
})
export class CategorieComponent {
  formulaire: FormGroup = this.formBuilder.group({
    id: [""],
    nomCategorie: ["", Validators.required]
  })

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private ServiceCategorie: CategorieService,
  ) { }

  idCategorie: any;
  isCreation: boolean = true;


  ngOnInit() {
    this.route.params.subscribe(
      parametres => {
        this.idCategorie = parametres['id'];
        if (this.idCategorie != "nouveau") {
          this.isCreation = false;
          this.ServiceCategorie
            .getCategorie(this.idCategorie)
            .subscribe({
              next: (categorie: categorie) => {
                this.formulaire.get("id")?.setValue(categorie.id);
                this.formulaire.get("nomCategorie")?.setValue(categorie.nomCategorie);
              }
            })
        }
      })
  }

  onSubmit() {
    if (this.formulaire.valid) {
      this.ServiceCategorie.editionCategorie(this.formulaire.value).subscribe(resultat => {
        console.log(resultat);
      })
      this.router.navigate(['/materiels'])
    } else {
      console.log("formulaire non valide");
    }
  }
}
