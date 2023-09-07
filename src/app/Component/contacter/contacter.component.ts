import { HttpClient } from '@angular/common/http';
import { Component, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StatutService } from 'src/app/services/statut.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-contacter',
  templateUrl: './contacter.component.html',
  styleUrls: ['./contacter.component.scss']
})
export class ContacterComponent {
  formulaire: FormGroup = this.formBuilder.group({
    id: [""],
    email: ["", [Validators.email, Validators.required]],
    prenom: ["", [Validators.required, Validators.minLength(3)]],
    nom: ["", [Validators.required, Validators.minLength(3)]],
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
}
