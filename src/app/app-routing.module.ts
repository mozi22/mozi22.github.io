import { ChaptersComponent } from "./components/chapters/chapters.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MainComponent } from "./components/main/main.component";

const routes: Routes = [
  { path: "", component: MainComponent },
  { path: "read/:book", component: ChaptersComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
