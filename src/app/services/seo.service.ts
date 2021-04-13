import { Injectable, Inject } from '@angular/core';
import { environment } from '@env/environment';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  constructor(private titleService: Title, private metaService: Meta, @Inject(DOCUMENT) private dom: Document) {}

  public set setMetaTitle(title: string) {
    this.titleService.setTitle(title);
  }

  public updateCanonicalUrl(url: string): void {
    const head = this.dom.getElementsByTagName('head')[0];
    let element: HTMLLinkElement | null = this.dom.querySelector(`link[rel='canonical']`) || null;
    if (element == null) {
      element = this.dom.createElement('link') as HTMLLinkElement;
      head.appendChild(element);
    }
    element.setAttribute('rel', 'canonical');
    element.setAttribute('href', url);
  }

  public setupSEOTags(title: string, description: string, keywords: string): void {
    this.setMetaTitle = title;

    if (!this.metaService.getTag(`name=${environment.SEO.keys.description}`)) {
      this.metaService.addTag({
        name: environment.SEO.keys.description,
        content: description,
      });
    } else {
      this.metaService.updateTag({
        name: environment.SEO.keys.description,
        content: description,
      });
    }

    if (!this.metaService.getTag(`name=${environment.SEO.keys.keywords}`)) {
      this.metaService.addTag({
        name: environment.SEO.keys.keywords,
        content: keywords,
      });
    } else {
      this.metaService.updateTag({
        name: environment.SEO.keys.keywords,
        content: keywords,
      });
    }
  }
}
