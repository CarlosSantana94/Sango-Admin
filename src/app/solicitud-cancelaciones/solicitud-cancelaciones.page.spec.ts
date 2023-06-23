import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SolicitudCancelacionesPage } from './solicitud-cancelaciones.page';

describe('SolicitudCancelacionesPage', () => {
  let component: SolicitudCancelacionesPage;
  let fixture: ComponentFixture<SolicitudCancelacionesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolicitudCancelacionesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SolicitudCancelacionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
