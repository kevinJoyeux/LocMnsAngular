import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnexionComponent } from './Component/Login/connexion/connexion.component';
import { AccueilComponent } from './Component/accueil/accueil.component';
import { UserAccountComponent } from './Component/User/user-account/user-account.component';
import { UserDetailsComponent } from './Component/User/user-details/user-details.component';
import { MdpOublieComponent } from './Component/Login/mdp-oublie/mdp-oublie.component';
import { ContacterComponent } from './Component/contacter/contacter.component';
import { AproposComponent } from './Component/apropos/apropos.component';
import { EvenementComponent } from './Component/evenement/evenement.component';
import { AjoutmembreComponent } from './Component/ajoutmembre/ajoutmembre.component';
import { ListemembreComponent } from './Component/listemembre/listemembre.component';

const routes: Routes = [
  { path: 'connexion', component: ConnexionComponent },
  { path: '', component: AccueilComponent },
  { path: 'accueil', component: AccueilComponent },
  { path: 'utilisateurs', component: UserAccountComponent },
  { path: 'utilisateur/details/:id', component: UserDetailsComponent },
  { path: 'mdpOublie', component: MdpOublieComponent },
  { path: 'nouscontacter', component: ContacterComponent },
  { path: 'apropos', component: AproposComponent },
  { path: 'evenement', component: EvenementComponent },
  { path: 'listemembre', component: ListemembreComponent },
  { path: 'ajoutmembre/:id', component: AjoutmembreComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
