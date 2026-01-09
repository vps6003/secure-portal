import { Component, computed, effect, inject, signal } from '@angular/core';
import { Post } from '../../core/models/api-response.model';
import { Observable } from 'rxjs';
import { DashboardServiceImpl } from '../../shared/services/impl/dashboard.service.impl';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
})
export class HomeComponent {
  dashboardServiceImpl = inject(DashboardServiceImpl);

  constructor() {
    effect(() => {
      const page = this.dashboardServiceImpl.page();
      const search = this.dashboardServiceImpl.search();

      this.fetchPosts(page, search);
    });
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.fetchUsers();
  }

  private fetchUsers() {
    this.dashboardServiceImpl.fetchUsers();
  }

  private fetchPosts(page: number, search: string) {
    this.dashboardServiceImpl.fetchPosts(page, search);
  }
  private fetchPostsLength(search: string) {
    this.dashboardServiceImpl.fetchPostsLength(search);
  }

  retry() {
    this.fetchPosts(this.dashboardServiceImpl.page(), this.dashboardServiceImpl.search());
  }

  nextPage() {
    this.dashboardServiceImpl.page.update((p) => p + 1);
  }

  prevPage() {
    if (this.dashboardServiceImpl.page() > 1) {
      this.dashboardServiceImpl.page.update((p) => p - 1);
    }
  }

  changeLimit(event: Event) {
    const value = Number((event.target as HTMLSelectElement).value);
    this.dashboardServiceImpl.limit.set(value);
    this.dashboardServiceImpl.page.set(1);
  }

  goToPage(p: number) {
    this.dashboardServiceImpl.page.set(p);
  }

  onSearch(e: any) {
    const value = e.target.value.trim();

    clearTimeout(this.dashboardServiceImpl.searchDebounce);

    this.dashboardServiceImpl.searchDebounce = window.setTimeout(() => {
      this.dashboardServiceImpl.page.set(1);
      this.dashboardServiceImpl.search.set(value);
    }, 1000); // debounce time (ms)
  }

  get userId() {
    return this.dashboardServiceImpl.userId;
  }
}
