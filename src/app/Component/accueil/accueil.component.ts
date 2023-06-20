import { Component } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ConnexionService } from 'src/app/services/connexion.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent {
  constructor(public connexionService: ConnexionService) { }
}
