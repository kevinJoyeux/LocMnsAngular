import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccueilComponent } from './Component/accueil/accueil.component';
import { ConnexionComponent } from './Component/Login/connexion/connexion.component';
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
import { MdpOublieComponent } from './Component/Login/mdp-oublie/mdp-oublie.component';
import { ContacterComponent } from './Component/contacter/contacter.component';
import { AproposComponent } from './Component/apropos/apropos.component';
import { EvenementComponent } from './Component/evenement/evenement.component';
import { AjoutmembreComponent } from './Component/ajoutmembre/ajoutmembre.component';
import { ListemembreComponent } from './Component/listemembre/listemembre.component';



@NgModule({
  declarations: [
    AppComponent,
    ConnexionComponent,
    AccueilComponent,
    UserAccountComponent,
    UserDetailsComponent,
    MdpOublieComponent,
    ContacterComponent,
    AproposComponent,
    EvenementComponent,
    AjoutmembreComponent,
    ListemembreComponent
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
