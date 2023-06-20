import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { utilisateur } from 'src/app/models/utilisateur';
import { ConnexionService } from 'src/app/services/connexion.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-mdp-oublie',
  templateUrl: './mdp-oublie.component.html',
  styleUrls: ['./mdp-oublie.component.scss']
})
export class MdpOublieComponent {

  formulaire: FormGroup = this.formBuilder.group({
    id: [""],
    affiliation: [""],
    motDePasse: [""],
    nom: [""],
    prenom: [""],
    login: [""],
    sexe: [""],
    portable: [""],
    statut: [""],
    email: ["", [Validators.required]]
  });

  constructor(
    private formBuilder: FormBuilder,
    private connexionService: ConnexionService,
    private router: Router,
    public serviceUtilisateur: UtilisateurService) { }

  listeUtiliseur: utilisateur[] = [];
  genereMotDePasse() {
    var chaine = 'abcdefghijknopqrstuvwxyzACDEFGHJKLMNPQRSTUVWXYZ12345679&#!?+-*_';
    var taille = chaine.length;
    var mdp = '';
    for (var i = 0; i < 8; i++) {
      mdp = mdp + chaine.charAt(Math.floor(Math.random() * taille));
    }
    return mdp;
  }

  onSubmit() {
    if (this.formulaire.valid) {
      console.log(this.formulaire.get("email")?.value);

      this.serviceUtilisateur.getUtilisateursByEmail(this.formulaire.get("email")?.value).subscribe({
        next: listeutilisateur => {

          this.formulaire.get("motDePasse")?.setValue(this.genereMotDePasse());
          console.log(this.formulaire.get("motDePasse")?.value);

          this.formulaire.get("id")?.setValue(listeutilisateur[0].id);
          this.formulaire.get("email")?.setValue(listeutilisateur[0].email);
          this.formulaire.get("prenom")?.setValue(listeutilisateur[0].prenom);
          this.formulaire.get("nom")?.setValue(listeutilisateur[0].nom);
          this.formulaire.get("login")?.setValue(listeutilisateur[0].login);
          this.formulaire.get("sexe")?.setValue(listeutilisateur[0].sexe);
          this.formulaire.get("affiliation")?.setValue(listeutilisateur[0].affiliation);
          this.formulaire.get("portable")?.setValue(listeutilisateur[0].portable);
          this.formulaire.get("statut")?.setValue(listeutilisateur[0].statut);
          this.serviceUtilisateur.editionUtilisateur(this.formulaire.value).subscribe(resultat => {
            console.log(resultat);
          })
        }
      })

    } else {
      console.log("coucou");

    }

  }
}
