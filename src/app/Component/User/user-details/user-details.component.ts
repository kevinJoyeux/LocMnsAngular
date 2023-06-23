import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { utilisateur } from 'src/app/models/utilisateur';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { StatutService } from 'src/app/services/statut.service';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent {

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

  genereMotDePasse() {
    var chaine = 'abcdefghijknopqrstuvwxyzACDEFGHJKLMNPQRSTUVWXYZ12345679&#!?+-*_';
    var taille = chaine.length;
    var mdp = '';
    for (var i = 0; i < 8; i++) {
      mdp = mdp + chaine.charAt(Math.floor(Math.random() * taille));
    }
    return mdp;
  }

  Inserer() {
    const test = this.formulaire.get("motDePasse");
    const resultat = this.genereMotDePasse();
    test?.setValue(resultat);
  }

  ngAfterViewInit() {
    const button = this.Elementref.nativeElement.querySelector('button');
    button.addEventListener('click', () => this.Inserer());
  }

  onSubmit() {
    if (this.formulaire.valid) {
      this.serviceUtilisateur.editionUtilisateur(this.formulaire.value).subscribe(resultat => {

      })
      this.router.navigate(['/utilisateurs'])

    } else {
      console.log("Formulaire non complet");
    }
  }
}
