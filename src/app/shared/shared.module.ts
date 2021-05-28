import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SourceComponent } from './source/source.component';
import { TitleHeaderComponent } from './title-header/title-header.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, TitleHeaderComponent, SourceComponent],
  imports: [CommonModule, HttpClientModule, FormsModule, ReactiveFormsModule, RouterModule, AppRoutingModule],
  exports: [
    HeaderComponent,
    AppRoutingModule,
    FooterComponent,
    TitleHeaderComponent,
    SourceComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class SharedModule {}
