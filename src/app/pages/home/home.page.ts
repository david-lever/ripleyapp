import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  username: any;
  password: any;

  constructor(
    private activeroute: ActivatedRoute,
    private router: Router,
    private menu: MenuController
  ) {
    this.activeroute.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.username = this.router.getCurrentNavigation().extras.state.dato;
        this.password =
          this.router.getCurrentNavigation().extras.state.password;
        console.log(this.username, this.password);
      }
    });
  }

  account() {
    this.router.navigate(['/signup']);
  }

  scan() {
    this.router.navigate(['/not-found']);
  }

  settings() {
    this.router.navigate(['/not-found']);
  }

  ngOnInit() {}
}
