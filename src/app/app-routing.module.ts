import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnexionComponent } from './Component/connexion/connexion.component';
import { AccueilComponent } from './Component/accueil/accueil.component';
import { InformationsPersonnellesComponent } from './Component/informations-personnelles/informations-personnelles.component';
import { UserAccountComponent } from './Component/User/user-account/user-account.component';
import { MaterielComponent } from './Component/Materiel/materiel-liste/materiel.component';
import { MaterielDetailsComponent } from './Component/Materiel/materiel-details/materiel-details.component';
import { UserDetailsComponent } from './Component/User/user-details/user-details.component';
import { CategorieComponent } from './Component/Materiel/categorie/categorie.component';
import { ModeleComponent } from './Component/Materiel/modele/modele.component';
import { MarqueComponent } from './Component/Materiel/marque/marque.component';
import { LieuStockageComponent } from './Component/Materiel/lieu-stockage/lieu-stockage.component';
import { LocationEnAttenteComponent } from './Component/Location/location-en-attente/location-en-attente.component';
import { LocationValideeComponent } from './Component/Location/location-validee/location-validee.component';
import { LocationDetailsComponent } from './Component/Location/location-details/location-details.component';
import { InformationsPersonnellesDetailsComponent } from './Component/informations-personnelles-details/informations-personnelles-details.component';

const routes: Routes = [
  { path: 'connexion', component: ConnexionComponent },
  { path: '', component: ConnexionComponent },
  { path: 'accueil', component: AccueilComponent },
  { path: 'informationsPersonnelles', component: InformationsPersonnellesComponent },
  { path: 'informationsPersonnelles/details/:id', component: InformationsPersonnellesDetailsComponent },
  { path: 'utilisateurs', component: UserAccountComponent },
  { path: 'utilisateur/details/:id', component: UserDetailsComponent },
  { path: 'materiels', component: MaterielComponent },
  { path: 'materiel/details/:id', component: MaterielDetailsComponent },
  { path: 'categorie/:id', component: CategorieComponent },
  { path: 'modele/:id', component: ModeleComponent },
  { path: 'marque/:id', component: MarqueComponent },
  { path: 'lieustockage/:id', component: LieuStockageComponent },
  { path: 'location-attente', component: LocationEnAttenteComponent },
  { path: 'location-validee', component: LocationValideeComponent },
  { path: 'location/details/:id', component: LocationDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
