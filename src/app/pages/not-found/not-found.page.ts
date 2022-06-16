import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.page.html',
  styleUrls: ['./not-found.page.scss'],
})
export class NotFoundPage implements OnInit {
  constructor(private router: Router) {}

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

  ngOnInit() {}
}
