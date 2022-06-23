import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { IUser } from 'src/app/interfaces/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: string;
  password: string;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {}

  login() {
    let navigationExtras: NavigationExtras = {
      state: { username: this.username, password: this.password },
    };
    this.router.navigate(['/home'], navigationExtras);
  }

  home() {
    this.router.navigate(['/home']);
  }

  bag() {
    this.router.navigate(['/not-found']);
  }

  scan() {
    this.router.navigate(['/not-found']);
  }

  settings() {
    this.router.navigate(['/not-found']);
  }

  onLogin(form: NgForm): void {
    if (form.valid) {
      this.authService.loginWithEmail({
        username: form.control.value.username,
        password: form.control.value.password,
      });
    }
  }

  resetPassword(email: string): void {
    this.authService.resetPassword(email);
  }

  googleAuth(): void {
    this.authService.googleLogin();
  }

  onSignup(): void {
    this.router.navigateByUrl('/signup');
  }

  onSubmit() {}
}
