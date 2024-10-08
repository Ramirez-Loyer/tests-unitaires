import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Training } from 'src/app/model/training.model';
import { ApiService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})

/**
 * Composant de gestion d'une formation à ajouter en base ou à mettre à jour
 */
export class TrainingComponent implements OnInit {
  myForm : FormGroup;
  training : Training;
  error : string = "";
  status : boolean = false;

  constructor(private formBuilder : FormBuilder, private apiService : ApiService, 
    private router : Router, private route:ActivatedRoute) { 
    this.training = new Training(0,"","",0,1);
    this.myForm = this.formBuilder.group({
        id   : [this.training.id],
        name : [this.training.name, Validators.required],
        description : [this.training.description, Validators.required],
        price : [this.training.price, [Validators.required,Validators.min(50)]]      
    })
  }

  /**
   * La méthode d'initialisation permet ici de récupérer l'id en cas de mise à jour, afin de récupérer les données associées via l'api
   * dans le cas contraire, il s'agit d'une création de formation 
   */
  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    if(id > 0) {
      this.status = true;
      this.apiService.getTraining(id).subscribe({
        next : (data) => {
            this.training = data;
            this.myForm.setValue({id : this.training.id , name : this.training.name, description : this.training.description, 
              price : this.training.price});
        },
        error : (err) => this.error = err
      })
    }
  }

  /**
   * Méthode d'ajout (ou de mise à jour) d'une nouvelle formation (en fonction du contexte d'appel : présence de l'id ?)
   * @param form comprend le formulaire avec toutes les données saisies par l'utilisateur
   */
  onAddTraining(form : FormGroup){
    if(form.valid){
      if(this.status) this.updateTraining(form);
      else this.apiService.postTraining({name:form.value.name , description:form.value.description 
          , price:form.value.price , quantity:1}).subscribe({
            next : (data) => console.log(data),  
            error : (err) => this.error = err.message,
            complete : () => this.router.navigateByUrl('trainings')
          })
    }
    else this.error = 'pb de saisi';
  }  

  /**
   * Méthode de mise à jour d'une nouvelle formation
   * @param form comprend le formulaire avec toutes les données saisies par l'utilisateur
   */
  updateTraining(form : FormGroup){
    if(form.valid) {
    this.apiService.putTraining({id :form.value.id , name:form.value.name , description:form.value.description 
      , price:form.value.price , quantity:1}).subscribe({
        next : (data) => console.log(data),  
        error : (err) => this.error = err.message,
        complete : () => this.router.navigateByUrl('trainings')
      })
    }
    else this.error = 'pb de saisi';
  }
}
