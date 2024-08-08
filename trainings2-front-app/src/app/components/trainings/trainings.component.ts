import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Training } from 'src/app/model/training.model';
import { ApiService } from 'src/app/services/api-service.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-trainings',
  templateUrl: './trainings.component.html',
  styleUrls: ['./trainings.component.css']
})
export class TrainingsComponent implements OnInit {
  listTrainings : Training[] | undefined;
  error = null;
  
  constructor(private cartService : CartService, private router : Router, private apiService : ApiService) { }

  ngOnInit(): void {
    this.listTrainings = [
      {id:1, name:'Java', description:'Formation Java SE 8 sur 5 jours', price: 1500, quantity:1}, 
      {id:2, name:'DotNet', description:'Formation DotNet 3 jours', price: 1000, quantity:1}, 
      {id:3, name:'Python', description:'Formation Python 5 jours', price: 1200, quantity:1}, 
    ]
  }

/**
 * Méthode qui renvoi à partir de l'Api toutes les formations accessibles 
 * en cas de problème avec l'api, un message d'erreur sera relayé et affiché
 */
getAllTrainings() {
  this.apiService.getTrainings().subscribe({
    next : (data) => this.listTrainings = data, 
    error : (err) => this.error = err.message, 
    complete : () => this.error = null
  })
}

/**
 * Méthode permettant à tous l'ajout d'une formation au panier en utilisant le service dédié
 * @param training 
 */
onAddToCart(training:Training){
  if(training.quantity > 0) {
    this.cartService.addTraining(training);
}

}
}
