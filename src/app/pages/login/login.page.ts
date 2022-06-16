import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: string;
  password: string;

  constructor(private router: Router) {}

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

  onSubmit() {}
}
