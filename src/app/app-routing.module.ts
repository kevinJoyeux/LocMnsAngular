import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnexionComponent } from './connexion/connexion.component';
import { AccueilComponent } from './accueil/accueil.component';
import { InformationsPersonnellesComponent } from './informations-personnelles/informations-personnelles.component';
import { UserAccountComponent } from './User/user-account/user-account.component';
import { MaterielComponent } from './materiel-liste/materiel.component';
import { MaterielDetailsComponent } from './materiel-details/materiel-details.component';
import { UserDetailsComponent } from './User/user-details/user-details.component';

const routes: Routes = [
  { path: 'connexion', component: ConnexionComponent },
  { path: '', component: ConnexionComponent },
  { path: 'accueil', component: AccueilComponent },
  { path: 'informationsPersonnelles', component: InformationsPersonnellesComponent },
  { path: 'utilisateurs', component: UserAccountComponent },
  { path: 'utilisateur/details/:id', component: UserDetailsComponent },
  { path: 'materiels', component: MaterielComponent },
  { path: 'materiel/details/:id', component: MaterielDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
