import { Component, HostListener } from '@angular/core';
import { utilisateur } from './models/utilisateur';
import { ConnexionService } from './services/connexion.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  utilisateurConnecte : utilisateur | null = null;

  constructor(private connexionService : ConnexionService){}

  ngOnInit(){
    this.connexionService._utilisateurConnecte.subscribe(
    (utilisateur) => (this.utilisateurConnecte = utilisateur)  
    );
  }

  onDeconnexion(){
    this.connexionService.deconnexion();
  }

// FONCTION POUR LE HAUT DE PAGE 
  @HostListener("window:scroll", []) onWindowScroll(){
    this.scrollFunction();
  }

  // when user scrolls down 20px from the top of the document, show the button
  scrollFunction(){
    if(document.body.scrollTop > 20 || document.documentElement.scrollTop > 20){
      document.getElementById('myBtn')!.style.display = "block";
    } else {
      document.getElementById('myBtn')!.style.display = "none";
    }
  }

  // when user clicls on the button, scroll to the top of the document 
  topFunction(){
    document.body.scrollTop = 0; // for safari
    document.documentElement.scrollTop = 0; // for chrome, firefox, IE, and Opera 
  }

  isConnected(){
    return this.utilisateurConnecte != null;
  }
  
}
