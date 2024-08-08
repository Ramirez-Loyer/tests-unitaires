import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app : AppComponent;

  /*beforeAll(() =>{
  })*/

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [ReactiveFormsModule]
    });

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;

  });

  it('changeAge() should change correctly', () => {
    expect(app.age).toBe(1);

    app.changeAge();
    
    expect(app.age).toBe(12);
  })

  it('name() should be a string', () => {
    //expect(app.name).toBe('test'); //Error: Expected 'mon app fms' to be 'test'
    expect(app.name).toBeInstanceOf(String);
    //expect(app.name).not.toBeInstanceOf(String); //Expected not to be an instance of String
    expect(app.name).toBe('mon app fms'); //Va vérifier les deux String + 'mon app fms'
  })

  it('should create the app', () => {
    expect(app).toBeTruthy(); //pour vérifier que cela returne vrai
  });

  it(`should have as title 'unit-test'`, () => {
    expect(app.title).toBe('unit-test'); //Fait une comparaison ===
    //expect(5).toEqual('5'); //Fait une comparaison character =/= chiffre
    //expect(5).toBeGreaterThan(6); //Dans l'execution: Error: 5 ne peux pas être plus grand que 6
  });

  it('should render title', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('unit-test app is running!');
  });
});
