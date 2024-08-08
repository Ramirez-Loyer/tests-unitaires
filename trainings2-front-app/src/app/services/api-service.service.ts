import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Training } from '../model/training.model';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  public getTrainings() {
    return this.http.get<Training[]>(environment.host+"/trainings");
  }

  public getTraining(id : number) {
    return this.http.get<Training>(environment.host+"/trainings/"+id);
  }


  public postTraining(training : any){
    return this.http.post<Training>(environment.host+"/trainings" , training);
  }

  public delTraining(training: Training) {
    return this.http.delete(environment.host+"/trainings/" + training.id);
  }

  public putTraining(training: any) {
    return this.http.put<Training>(environment.host+"/trainings/"+training.id, training);
  }
}
