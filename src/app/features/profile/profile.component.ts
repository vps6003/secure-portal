import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileServiceImpl } from '../../shared/services/impl/profile.service.impl';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
})
export class ProfileComponent {
  profileServiceImpl = inject(ProfileServiceImpl);

  ngOnInit(): void {
    this.profileServiceImpl.getUsers();
  }

  get userId() {
    return this.profileServiceImpl.userId;
  }
}
