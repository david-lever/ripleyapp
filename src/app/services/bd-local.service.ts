import { Storage } from '@ionic/storage-angular';
import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { IClients } from '../interfaces/clients';

@Injectable({
  providedIn: 'root',
})
export class BdLocalService {
  clients: IClients[] = [];

  private _storage: Storage | null = null;
  constructor(
    private storage: Storage,
    public toastController: ToastController
  ) {
    this.init();
    this.loadClients();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
  }

  async loadClients() {
    const Clients = await this.storage.get('clients');
    if (Clients) {
      this.clients = Clients;
    }
  }

  saveClients(asignatura: string, fecha: Date) {
    // Escribir una instrucción lambda para verificar que el numero no exista en mi lista de contactos.
    const existe = this.clients.find((c) => c.strUsername === username);
    if (!existe) {
      this.clients.unshift({ strUsername: username, strPassword: password });

      this._storage.set('agenda', this.clients);
      this.presentToast('Asistencia registrada exitosamente');
    } else {
      this.presentToast('La asistencia ya fue registrada!!');
    }
  }

  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: message,
      translucent: true,
      color: 'light',
      position: 'top',
      duration: 2000,
    });

    toast.present();
  }
}
