import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { DblocalService } from '../..//services/dblocal.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  username: any;
  password: any;
  data: any;
  public categories = [];
  public featuredProducts = [];
  public bestSellProducts = [];

  constructor(
    private activeroute: ActivatedRoute,
    private router: Router,
    private menuCtrl: MenuController
  ) {
    this.activeroute.queryParams.subscribe((parameters) => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.username =
          this.router.getCurrentNavigation().extras.state.username;
        this.password =
          this.router.getCurrentNavigation().extras.state.password;
        console.log(this.username, this.password);
      }
    });
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

  account() {
    this.router.navigate(['/signup']);
  }

  ngOnInit() {
    // this.categories = this.data.getCategories();
    // this.featuredProducts = this.data.getFeaturedProducts();
    // this.bestSellProducts = this.data.getBestSellProducts();
  }

  toggleMenu() {
    this.menuCtrl.toggle();
  }
}
