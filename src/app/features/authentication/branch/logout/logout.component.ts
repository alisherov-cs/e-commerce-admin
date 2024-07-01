import { Component, OnInit, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthenticationService } from '@/features/authentication/authentication.service';
import { LoadingComponent } from '@/shared/components/loading/loading.component';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [LoadingComponent],
  templateUrl: './logout.component.html',
})
export class LogoutComponent implements OnInit {
  authService = inject(AuthenticationService);
  router = inject(Router);
  snackBar = inject(MatSnackBar);

  async ngOnInit(): Promise<void> {
    await this.authService.logout();
    this.router.navigate(['/auth/login']);
    this.snackBar.open('Logged out successfully');
  }
}
