import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'unit-test';
  public age: number = 1;

  constructor(private fb: FormBuilder ) {

  }

  public get name(): string {
    return 'mon app fms';
  }
  public changeAge(): void {
    this.age = 12;
  }

}
