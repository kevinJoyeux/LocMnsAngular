import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccueilComponent } from './Component/accueil/accueil.component';
import { ConnexionComponent } from './Component/connexion/connexion.component';
import { InformationsPersonnellesComponent } from './Component/informations-personnelles/informations-personnelles.component';
import { UserAccountComponent } from './Component/User/user-account/user-account.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { JwtInterceptor } from './services/jwt.interceptor';
import { MatMenuModule } from '@angular/material/menu';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserDetailsComponent } from './Component/User/user-details/user-details.component';
import { MaterielComponent } from './Component/Materiel/materiel-liste/materiel.component';
import { MaterielDetailsComponent } from './Component/Materiel/materiel-details/materiel-details.component';
import { CategorieComponent } from './Component/Materiel/categorie/categorie.component';
import { AffiliationComponent } from './Component/User/affiliation/affiliation.component';
import { MarqueComponent } from './Component/Materiel/marque/marque.component';
import { ModeleComponent } from './Component/Materiel/modele/modele.component';
import { LieuStockageComponent } from './Component/Materiel/lieu-stockage/lieu-stockage.component';
import { LocationEnAttenteComponent } from './Component/Location/location-en-attente/location-en-attente.component';
import { LocationValideeComponent } from './Component/Location/location-validee/location-validee.component';
import { LocationDetailsComponent } from './Component/Location/location-details/location-details.component';
import { InformationsPersonnellesDetailsComponent } from './Component/informations-personnelles-details/informations-personnelles-details.component';


@NgModule({
  declarations: [
    AppComponent,
    ConnexionComponent,
    AccueilComponent,
    InformationsPersonnellesComponent,
    UserAccountComponent,
    UserDetailsComponent,
    MaterielComponent,
    MaterielDetailsComponent,
    CategorieComponent,
    AffiliationComponent,
    MarqueComponent,
    ModeleComponent,
    LieuStockageComponent,
    LocationEnAttenteComponent,
    LocationValideeComponent,
    LocationDetailsComponent,
    InformationsPersonnellesDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatMenuModule,
    NgbModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
