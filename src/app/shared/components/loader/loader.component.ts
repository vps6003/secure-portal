import { Component } from '@angular/core';
import { LoaderService } from '../../../core/services/loader.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loader',
  imports: [CommonModule],
  template: `
    <div class="loader-backdrop" *ngIf="loader.isLoading()">
      <div class="spinner"></div>
    </div>
  `,
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent {
  constructor(public loader: LoaderService) {}
}
