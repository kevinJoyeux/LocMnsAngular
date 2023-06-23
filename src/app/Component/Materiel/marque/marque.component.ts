import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MarqueService } from 'src/app/services/materiel/marque.service';
import { marque } from 'src/app/models/materiel/marque';

@Component({
  selector: 'app-marque',
  templateUrl: './marque.component.html',
  styleUrls: ['./marque.component.scss']
})
export class MarqueComponent {
  formulaire: FormGroup = this.formBuilder.group({
    id: [""],
    nomMarque: ["", Validators.required]
  })

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private Servicemarque: MarqueService,
  ) { }

  idmarque: any;
  isCreation: boolean = true;


  ngOnInit() {
    this.route.params.subscribe(
      parametres => {
        this.idmarque = parametres['id'];
        if (this.idmarque != "nouveau") {
          this.isCreation = false;
          this.Servicemarque
            .getMarque(this.idmarque)
            .subscribe({
              next: (marque: marque) => {
                this.formulaire.get("id")?.setValue(marque.id);
                this.formulaire.get("nommarque")?.setValue(marque.nomMarque);
              }
            })
        }
      })
  }

  onSubmit() {
    if (this.formulaire.valid) {
      this.Servicemarque.editionMarque(this.formulaire.value).subscribe(resultat => {

      })
      this.router.navigate(['/materiels'])
    } else {
      console.log("formulaire non valide");
    }
  }
}

