import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NuevaSubSeccionPage } from './nueva-sub-seccion.page';

describe('NuevaSubSeccionPage', () => {
  let component: NuevaSubSeccionPage;
  let fixture: ComponentFixture<NuevaSubSeccionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevaSubSeccionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NuevaSubSeccionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
