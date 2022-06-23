import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  rut: string;
  password: string;
  data: any;

  constructor(
    private router: Router,
    private alertController: AlertController,
    private authService: AuthService
  ) {}
  ngOnInit() {}

  signup() {
    let navigationExtras: NavigationExtras = {
      state: { rut: this.rut, password: this.password },
    };
    this.router.navigate(['/home'], navigationExtras);
  }

  async alert() {
    const alert = await this.alertController.create({
      cssClass: 'alert',
      header: 'Confirmación de cuenta registrada',
      message: 'Ha creado la cuenta de manera exitosa.',
      buttons: ['OK'],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('', role);
  }

  home() {
    this.router.navigate(['/home']);
  }

  bag() {
    this.router.navigate(['/signup']);
  }

  scan() {
    this.router.navigate(['/not-found']);
  }

  settings() {
    this.router.navigate(['/not-found']);
  }

  onSignup(form: NgForm) {
    if (form.valid) {
      this.authService.signUpWithEmail({
        rut: form.control.value.rut,
        password: form.control.value.password,
      });
    }
  }

  onSubmit() {}
}
