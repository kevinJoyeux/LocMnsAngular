import { Component } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ConnexionService } from 'src/app/services/connexion.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent {
  public images = [
    { src: "../assets/profil.png" },
    { src: "../assets/photo_cursed.jpg" },
    { src: "../assets/MNS-logo.png" }
  ];

  currentImage = this.images[0];

  prevSlide() {
    const currentIndex = this.images.indexOf(this.currentImage);
    const prevIndex = (currentIndex - 1 + this.images.length) % this.images.length;
    this.currentImage = this.images[prevIndex];
  }

  nextSlide() {
    const currentIndex = this.images.indexOf(this.currentImage);
    const nextIndex = (currentIndex + 1) % this.images.length;
    this.currentImage = this.images[nextIndex];
  }
}
