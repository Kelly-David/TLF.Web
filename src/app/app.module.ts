import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { NavigationModule } from './navigation/navigation.module';
import { LandingModule } from './landing/landing.module';
import { HorseModule } from './horse/horse.module';
import { ViewModule } from './views/view.module';
import { ContactViewComponent } from './contact/contact-view/contact-view.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactViewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    BrowserAnimationsModule,
    AuthModule,
    NavigationModule,
    LandingModule,
    HorseModule,
    ViewModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
