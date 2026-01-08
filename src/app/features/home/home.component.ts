import { Component, computed, effect, inject, signal } from '@angular/core';
import { DashboardService } from '../../shared/services/dashboard.service';
import { Post } from '../../core/models/api-response.model';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
})
export class HomeComponent {
  private dashboardService = inject(DashboardService);

  posts = signal<Post[]>([]);
  loading = signal(false);
  error = signal(false);
  noData = computed(() => (this.totalCount() ? false : true));
  prevPg = computed(() => {
    return this.page() == 1 ? true : false;
  });

  nextPg = computed(() => {
    const curr = this.page();
    const total = this.totalPages();
    // const limit = this.limit();
    // const items = curr * limit;
    // return items < this.totalCount();
    return this.totalCount() >= total * this.limit();
  });

  page = signal(1);
  readonly limits = [10, 25, 50, 100];
  limit = signal(10);
  totalCount = signal(0); //for jsonplaceholder/post it is fixed to 100 will set it later!
  totalPages = computed(() => Math.ceil(this.totalCount() / this.limit()));
  search = signal('');
  pages = computed(() => {
    const total = this.totalPages();
    const current = this.page();

    const start = Math.max(1, current - total);
    const end = Math.min(total, current + total);

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  });

  private searchDebounce?: number;

  constructor() {
    effect(() => {
      const page = this.page();
      const search = this.search();

      this.fetchPosts(page, search);
    });
  }

  private fetchPosts(page: number, search: string) {
    this.loading.set(true);
    this.error.set(false);

    this.dashboardService.getPosts(page, this.limit(), search).subscribe({
      next: (data) => {
        if (search) {
          this.fetchPostsLength(search);
        }
        this.posts.set(data);
        this.loading.set(false);
        const totalCount = !this.search() ? 100 : Math.min(data.length, 100);
        this.totalCount.set(totalCount);
      },
      error: () => {
        this.error.set(true);
        this.loading.set(false);
      },
    });
  }
  private fetchPostsLength(search: string) {
    this.dashboardService.getPosts(1, 100, search).subscribe({
      next: (data) => {
        const totalCount = Math.min(data.length, 100);
        this.totalCount.set(totalCount);
      },
      error: () => {
        this.error.set(true);
        this.loading.set(false);
      },
    });
  }

  retry() {
    this.fetchPosts(this.page(), this.search());
  }

  nextPage() {
    this.page.update((p) => p + 1);
  }

  prevPage() {
    if (this.page() > 1) {
      this.page.update((p) => p - 1);
    }
  }

  changeLimit(event: Event) {
    const value = Number((event.target as HTMLSelectElement).value);
    this.limit.set(value);
    this.page.set(1);
  }

  goToPage(p: number) {
    this.page.set(p);
  }

  onSearch(e: any) {
    const value = e.target.value.trim();

    clearTimeout(this.searchDebounce);

    this.searchDebounce = window.setTimeout(() => {
      this.page.set(1);
      this.search.set(value);
    }, 1000); // debounce time (ms)
  }
}
