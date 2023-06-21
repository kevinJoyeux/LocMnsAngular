import { HttpClient } from '@angular/common/http';
import { Component, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { utilisateur } from 'src/app/models/utilisateur';
import { StatutService } from 'src/app/services/statut.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-informations-personnelles-details',
  templateUrl: './informations-personnelles-details.component.html',
  styleUrls: ['./informations-personnelles-details.component.scss']
})
export class InformationsPersonnellesDetailsComponent {
  formulaire: FormGroup = this.formBuilder.group({
    id: [""],
    email: ["", [Validators.email, Validators.required]],
    prenom: ["", [Validators.required, Validators.minLength(3)]],
    nom: ["", [Validators.required, Validators.minLength(3)]],
    login: ["", Validators.required],
    sexe: ["", Validators.required],
    affiliation: ["", Validators.required],
    statut: ["", Validators.required],
    motDePasse: ["", Validators.required],
    portable: ["", Validators.required]
  })

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private hhtp: HttpClient,
    private serviceUtilisateur: UtilisateurService,
    private router: Router,
    private serviceStatut: StatutService,
    private Elementref: ElementRef
  ) { }

  idUtilisateur: any;
  isCreation: boolean = true;
  listeStatut: any[] = [];



  ngOnInit() {
    this.serviceStatut.getStatuts().subscribe({
      next: listeStatut => this.listeStatut = listeStatut,
      error: erreur => console.log(erreur)
    });
    this.route.params.subscribe(
      parametres => {
        this.idUtilisateur = parametres['id'];

        if (this.idUtilisateur != "nouveau") {
          this.isCreation = false;
          this.serviceUtilisateur
            .getUtilisateur(this.idUtilisateur)
            .subscribe({
              next: (utilisateur: utilisateur) => {

                this.formulaire.get("id")?.setValue(utilisateur.id);
                this.formulaire.get("email")?.setValue(utilisateur.email)
                this.formulaire.get("prenom")?.setValue(utilisateur.prenom)
                this.formulaire.get("nom")?.setValue(utilisateur.nom)
                this.formulaire.get("login")?.setValue(utilisateur.login)
                this.formulaire.get("sexe")?.setValue(utilisateur.sexe)
                this.formulaire.get("affiliation")?.setValue(utilisateur.affiliation)
                this.formulaire.get("portable")?.setValue(utilisateur.portable)
                this.formulaire.get("motDePasse")?.setValue(utilisateur.motDePasse)
                this.formulaire.get("statut")?.setValue(utilisateur.statut)
              }
            });
        }
      });
  }

  compareStatut(statutOption: any, StatutUtilisateur: any) {
    return StatutUtilisateur != null && StatutUtilisateur.id == statutOption.id;
  }

  onSubmit() {
    if (this.formulaire.valid) {
      this.serviceUtilisateur.editionUtilisateur(this.formulaire.value).subscribe(resultat => {
        console.log(resultat);
      })
      this.router.navigate(['/informationsPersonnelles'])

    } else {
      console.log("formulaire non complet");
    }
  }
}

