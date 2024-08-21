import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TerminosYCondicionesPage } from './terminos-ycondiciones.page';

describe('TerminosYCondicionesPage', () => {
  let component: TerminosYCondicionesPage;
  let fixture: ComponentFixture<TerminosYCondicionesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TerminosYCondicionesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TerminosYCondicionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
