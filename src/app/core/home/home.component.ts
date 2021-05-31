import { Component, OnInit } from '@angular/core';
import { environment } from '@env/environment';
import { SeoService } from '@services/seo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public todayDate: string = new Date().toDateString();

  constructor(private seoService: SeoService) {}

  ngOnInit(): void {
    this.seoService.updateCanonicalUrl(`${environment.base}`);
    this.seoService.setupSEOTags(
      environment.SEO.static_pages.home.title,
      environment.SEO.static_pages.home.description,
      environment.SEO.static_pages.home.keywords,
    );
  }
}
