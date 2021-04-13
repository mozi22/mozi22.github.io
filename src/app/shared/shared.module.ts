import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { TitleHeaderComponent } from './title-header/title-header.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, TitleHeaderComponent],
  imports: [CommonModule, HttpClientModule, FormsModule, ReactiveFormsModule, RouterModule],
  exports: [HeaderComponent, FooterComponent, TitleHeaderComponent, FormsModule, ReactiveFormsModule],
})
export class SharedModule {}
