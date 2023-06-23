import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LieuStockageService } from 'src/app/services/materiel/lieu-stockage.service';
import { lieuStockage } from 'src/app/models/materiel/lieuStockage';
@Component({
  selector: 'app-lieu-stockage',
  templateUrl: './lieu-stockage.component.html',
  styleUrls: ['./lieu-stockage.component.scss']
})
export class LieuStockageComponent {
  formulaire: FormGroup = this.formBuilder.group({
    id: [""],
    lieuStockage: ["", Validators.required]
  })

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private Servicelieustockage: LieuStockageService
  ) { }

  idlieustockage: any;
  isCreation: boolean = true;


  ngOnInit() {
    this.route.params.subscribe(
      parametres => {
        this.idlieustockage = parametres['id'];
        if (this.idlieustockage != "nouveau") {
          this.isCreation = false;
          this.Servicelieustockage
            .getlieuStockage(this.idlieustockage)
            .subscribe({
              next: (lieustockage: lieuStockage) => {
                this.formulaire.get("id")?.setValue(lieustockage.id);
                this.formulaire.get("nomlieustockage")?.setValue(lieustockage.lieuStockage);
              }
            })
        }
      })
  }

  onSubmit() {
    if (this.formulaire.valid) {
      this.Servicelieustockage.editionlieuStockage(this.formulaire.value).subscribe(resultat => {

      })
      this.router.navigate(['/materiels'])
    } else {
      console.log("formulaire non valide");
    }
  }
}
