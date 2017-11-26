import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { FormsModule } from '@angular/forms';

import { RoutingModule} from './routing-module/routing-module.module';
import { HashLocationStrategy, LocationStrategy} from "@angular/common";
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { AuthenticationService } from "./_services/authService";
import { SubscriberService } from "./_services/subscriberService";
import { HttpModule } from '@angular/http';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './_services/auth-guard';
import { JWT_OPTIONS } from '@auth0/angular-jwt';
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';
import { TextsComponent } from './texts/texts.component';
import { Select2Module } from 'ng2-select2';
import { ContactsComponent } from './contacts/contacts.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    HomeComponent,
    TextsComponent,
    ContactsComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    Angular2FontawesomeModule,
    FormsModule,
    HttpModule,
    Select2Module
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy}, 
    CookieService, 
    AuthenticationService, 
    AuthGuard,
    JwtModule,
    JwtHelperService,
    SubscriberService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
