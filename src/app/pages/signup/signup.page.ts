import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  username: string;
  password: string;

  constructor(private router: Router) {}
  ngOnInit() {}
  // Esto del private router: Router es necesario hacerlo y debo seleccionar Router para que lo importe.

  signup() {
    // Utilizo api enrutador para llamar la página.
    let navigationExtras: NavigationExtras = {
      state: { username: this.username, password: this.password },
      // Asigno un elemento con clave y valor.
    };
    // Asigno al navigationExtras como parámetro para enviar el dato.
    this.router.navigate(['/home'], navigationExtras);
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

  onSubmit() {}
}
