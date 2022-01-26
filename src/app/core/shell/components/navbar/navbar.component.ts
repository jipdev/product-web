import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from "@angular/router";
import { filter } from "rxjs";
import { ROUTES } from "../../constants/routes";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  routes = ROUTES;
  activeUrl!: string;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.listenNavigation();
  }

  listenNavigation(): void {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe({
      next: (event) => this.activeUrl = (event as NavigationEnd).urlAfterRedirects
    });
  }

  goTo(url: string) {
    this.router.navigateByUrl(url);
  }
}
