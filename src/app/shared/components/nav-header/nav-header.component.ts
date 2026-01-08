import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-header.component.html',
})
export class NavHeaderComponent {
  router = inject(Router);
}
