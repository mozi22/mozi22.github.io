import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { environment } from '@env/environment';
import { filter } from 'rxjs/operators';

declare const gtag: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ourworldincrypto2';

  constructor(router: Router) {
    const navEndEvent$ = router.events.pipe(filter((e) => e instanceof NavigationEnd));
    navEndEvent$.subscribe((e: NavigationEnd | any) => {
      gtag('config', environment.analytics.google.UID, { page_path: e.urlAfterRedirects });
    });
  }
}
