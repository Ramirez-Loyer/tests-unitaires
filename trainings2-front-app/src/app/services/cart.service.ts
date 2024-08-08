import { Injectable } from '@angular/core';

import { Training } from '../model/training.model';
import { Customer } from '../model/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  saveCustomer(arg0: Customer) {
    throw new Error('Method not implemented.');
  }
  getCustomer(): import("../model/customer.model").Customer {
    throw new Error('Method not implemented.');
  }
  private cart : Map<number,Training>;

  constructor() {     
    // au démarrage du service, je récupère le contenu du local storage : command en cours
    let cart = localStorage.getItem('cart');
    if(cart){  // le panier existe déjà
      this.cart = new Map(JSON.parse(cart));
    } // sinon il faut le créer
    else this.cart = new Map<number,Training>();
  }

  addTraining(training: Training) { 
    this.cart.set(training.id,training);
    this.saveCart(); //à chaque fois que j'ajoute un élément au panier, je met à jour le local storage
  }


  saveCart() {
    localStorage.setItem('cart',JSON.stringify([...this.cart]));
  }

  removeTraining(training: Training) {
    this.cart.delete(training.id);
    this.saveCart();
  }

  getCart() {
    return Array.from(this.cart.values());
  }

  getSize() {    
    return this.cart.size;
  }

  getAmount() : number {
    let amount : number = 0;
    this.cart.forEach(training => {
      amount += training.price * training.quantity;
    });
    return amount;    
  }


  clear() {
    this.cart.clear();
    localStorage.removeItem('cart');
  }
}
