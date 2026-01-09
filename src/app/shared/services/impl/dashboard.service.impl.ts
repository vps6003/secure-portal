import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { DashboardService } from '../dashboard.service';
import { Post } from '../../../core/models/api-response.model';
import { SessionManager } from '../../../core/auth/session.manager';

@Injectable({ providedIn: 'root' })
export class DashboardServiceImpl {
  private dashboardService = inject(DashboardService);
  public session = inject(SessionManager);

  users = signal<any[]>([]);

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
    return curr >= total;
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

  public searchDebounce?: number;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.fetchUsers();
  }

  public fetchUsers() {
    this.loading.set(true);
    this.error.set(false);

    this.dashboardService.getUsers().subscribe({
      next: (result: any) => {
        this.users.set(result);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(true);
        this.loading.set(false);
      },
    });
  }

  public fetchPosts(page: number, search: string) {
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
  public fetchPostsLength(search: string) {
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
    }, 500); // debounce time (ms)
  }

  get userId() {
    return this.dashboardService.userId;
  }
}
