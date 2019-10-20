import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '@core/providers';

@Component({
  selector: 'barbex-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  show = false;

  constructor(private readonly auth: AuthService, private readonly router: Router) { }

  ngOnInit() {
    document.querySelectorAll('ul.navbar-nav li.nav-item a.nav-link').forEach((element: Element & { onclick: () => any }) => {
      element.onclick = () => this.show = false;
    });
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/auth/login']);
  }

}
