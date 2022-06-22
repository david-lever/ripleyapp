import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Plugins } from '@capacitor/core';
import firebase from 'firebase/compat/app';
import { BehaviorSubject } from 'rxjs';

const { Storage } = Plugins;

const CART_STORAGE_KEY = 'MY_CART';

const INCREMENT = firebase.firestore.FieldValue.increment(1);
const DECREMENT = firebase.firestore.FieldValue.increment(-1);

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  cart = new BehaviorSubject({});
  cartKey = null;
  productsCollection: AngularFirestoreCollection;

  constructor(private afs: AngularFirestore) {
    this.loadCart();
    this.productsCollection = this.afs.collection('products');
  }

  getProducts() {
    return this.productsCollection.valueChanges({ idField: 'id' });
  }

  async loadCart() {
    const result = await Storage.get({ key: CART_STORAGE_KEY });
    if (result.value) {
      this.cartKey = result.value;

      this.afs
        .collection('carts')
        .doc(this.cartKey)
        .valueChanges()
        .subscribe((result: any) => {
          delete result['lastUpdate'];

          this.cart.next(result || {});
        });
    } else {
      const fbDocument = await this.afs.collection('carts').add({
        lastUpdate: firebase.firestore.FieldValue.serverTimestamp(),
      });
      this.cartKey = fbDocument.id;
      await Storage.set({ key: CART_STORAGE_KEY, value: this.cartKey });

      this.afs
        .collection('carts')
        .doc(this.cartKey)
        .valueChanges()
        .subscribe((result: any) => {
          delete result['lastUpdate'];
          console.log('cart changed: ', result);
          this.cart.next(result || {});
        });
    }
  }
}
