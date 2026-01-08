import { Component, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderService } from '../../../core/services/loader.service';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (auth() || global()) {
    <!-- FULL APP OVERLAY -->
    <div
      class="
          fixed inset-0 z-[9999]
          bg-black/40 backdrop-blur-sm
          flex items-center justify-center
          pointer-events-auto
        "
    >
      <div
        class="
            bg-white rounded-xl shadow-xl
            px-6 py-4
            flex items-center gap-3
          "
      >
        @if (auth()) {
        <!-- AUTH LOADER -->
        <div class="flex items-end gap-1 h-6">
          <span class="w-1 h-2 bg-blue-600 animate-pulse"></span>
          <span class="w-1 h-4 bg-blue-600 animate-pulse"></span>
          <span class="w-1 h-6 bg-blue-600 animate-pulse"></span>
        </div>
        } @if (global()) {
        <!-- GLOBAL LOADER -->
        <div
          class="
                w-6 h-6
                border-2 border-gray-300
                border-t-blue-600
                rounded-full
                animate-spin
              "
        ></div>
        <span class="text-sm font-medium text-gray-700"> Please wait… </span>
        }
      </div>
    </div>
    }
  `,
})
export class LoaderComponent {
  private loader = inject(LoaderService);

  auth = this.loader.isAuthLoading;
  global = this.loader.isGlobalLoading;

  constructor() {
    effect(() => {
      this.auth();
      this.global();
    });
  }
}
