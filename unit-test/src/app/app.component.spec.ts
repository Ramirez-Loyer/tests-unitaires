import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app : AppComponent;

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

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should have as title 'unit-test'`, () => {
    expect(app.title).toEqual('unit-test');
  });

  it('should render title', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('unit-test app is running!');
  });
});
