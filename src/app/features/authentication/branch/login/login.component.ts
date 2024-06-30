import { Component, OnInit, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { merge } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthenticationService } from '@/features/authentication/authentication.service';
import { LoginInputInterface } from '@/features/authentication/types/login.interface';
import { LoadingComponent } from '@/shared/components/loading/loading.component';
import { Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    LoadingComponent,
  ],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  readonly authService = inject(AuthenticationService);
  readonly snackBar = inject(MatSnackBar);
  readonly router = inject(Router);
  readonly auth = inject(Auth);

  readonly loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  errorMessages = signal({
    email: '',
    password: '',
  });
  apiErrorMessage = signal('');
  hiddenPassword = signal(true);
  isLoading = signal(false);

  constructor() {
    merge(this.loginForm.statusChanges, this.loginForm.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessages());
  }

  ngOnInit(): void {
    this.auth.onAuthStateChanged(async (user) => {
      if (user) {
        const isAdmin = await this.authService.checkIsAdmin(user.uid);

        if (isAdmin) {
          this.router.navigate(['/']);
        }
      }
    });
  }

  setError(key: 'email' | 'password', message: string): void {
    this.errorMessages.set({
      ...this.errorMessages(),
      [key]: message,
    });
  }

  updateErrorMessages(): void {
    if (this.loginForm.controls.email.hasError('required')) {
      this.setError('email', 'Email is required');
    } else if (this.loginForm.controls.email.hasError('email')) {
      this.setError('email', 'Invalid email');
    } else if (this.loginForm.controls.email.hasError('wrong')) {
      this.setError('email', 'Try again');
    }

    if (this.loginForm.controls.password.hasError('required')) {
      this.setError('password', 'Password is required');
    } else if (this.loginForm.controls.password.hasError('wrong')) {
      this.setError('password', 'Try again');
    }
  }

  toggleVisibility(): void {
    this.hiddenPassword.set(!this.hiddenPassword());
  }

  async onSubmit(): Promise<void> {
    if (!this.loginForm.invalid) {
      this.isLoading.set(true);
      const isLoadingTimoutId = setTimeout(() => {
        this.isLoading.set(false);
        this.snackBar.open('Timout!. Server error, please try again later');
      }, 15000);

      this.authService
        .login(this.loginForm.getRawValue() as LoginInputInterface)
        .then(() => {
          this.router.navigate(['/']);
          this.snackBar.open("You're logged in!");
        })
        .catch(() => {
          this.snackBar.open('Email or Password incorrect!', '', {
            panelClass: 'error',
          });
          this.apiErrorMessage.set('Wrong email or password!');
          this.loginForm.controls.email.setErrors({
            wrong: true,
          });
          this.loginForm.controls.password.setErrors({
            wrong: true,
          });
        })
        .finally(() => {
          this.loginForm.reset();
          this.isLoading.set(false);
          clearTimeout(isLoadingTimoutId);
        });
    }
  }
}
