import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { utilisateur } from 'src/app/models/utilisateur';
import { PasswordStrengthValidator } from 'src/app/password-strength.validators';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { StatutService } from 'src/app/services/statut.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent {

  formulaire: FormGroup = this.formBuilder.group({
    email: ["", [Validators.email, Validators.required]],
    prenom: ["", [Validators.required, Validators.minLength(3)]],
    nom: ["", [Validators.required, Validators.minLength(3)]],
    login: ["", Validators.required],
    sexe: ["", Validators.required],
    affiliation: ["", Validators.required],
    statut: ["", Validators.required],
    password1: ["", Validators.required],
    password2: ["", Validators.required],
    portable: ["", Validators.required]
  })

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private hhtp: HttpClient,
    private serviceUtilisateur: UtilisateurService,
    private router: Router,
    private serviceStatut: StatutService
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
                console.log(utilisateur);

                this.formulaire.get("email")?.setValue(utilisateur.email)
                this.formulaire.get("prenom")?.setValue(utilisateur.prenom)
                this.formulaire.get("nom")?.setValue(utilisateur.nom)
                this.formulaire.get("login")?.setValue(utilisateur.login)
                this.formulaire.get("sexe")?.setValue(utilisateur.sexe)
                this.formulaire.get("affiliation")?.setValue(utilisateur.affiliation)
                this.formulaire.get("portable")?.setValue(utilisateur.portable)
                this.formulaire.get("password1")?.setValue(utilisateur.motDePasse)
                this.formulaire.get("password2")?.setValue(utilisateur.motDePasse)
                this.formulaire.get("statut")?.setValue(utilisateur.statut.nomStatut)
              }
            });
        }
      });
  }

  onSubmit() {
    console.log("Alors peut etre");
    var selectElement = this.formulaire.value;
    console.log(selectElement);
    if (this.formulaire.valid) {
      this.serviceUtilisateur.editionUtilisateur(this.formulaire.value).subscribe(resultat => {
        console.log(resultat);
      })
    } else {
      console.log("eh bah non");
    }
  }
}
