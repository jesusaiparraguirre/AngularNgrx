import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './store/effects/auth.effects';
import { AuthService } from './services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { reducers } from './store/app.states';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers as any,{}),
    EffectsModule.forRoot([AuthEffects]),
    HttpClientModule
  ],
  bootstrap: [AppComponent],
  providers: [AuthService]
})
export class AppModule { }
