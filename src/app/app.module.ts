import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MainComponent } from "./components/main/main.component";
import { BookItemComponent } from "./components/book-item/book-item.component";
import { IntroBannerComponent } from "./components/intro-banner/intro-banner.component";
import { HeaderComponent } from "./components/header/header.component";
import { ChaptersComponent } from "./components/chapters/chapters.component";

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    BookItemComponent,
    IntroBannerComponent,
    HeaderComponent,
    ChaptersComponent
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
