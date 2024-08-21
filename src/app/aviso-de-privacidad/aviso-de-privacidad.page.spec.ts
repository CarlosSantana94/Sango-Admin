import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AvisoDePrivacidadPage } from './aviso-de-privacidad.page';

describe('AvisoDePrivacidadPage', () => {
  let component: AvisoDePrivacidadPage;
  let fixture: ComponentFixture<AvisoDePrivacidadPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvisoDePrivacidadPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AvisoDePrivacidadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
