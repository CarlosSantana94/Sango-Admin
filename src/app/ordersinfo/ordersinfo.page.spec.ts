import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OrdersinfoPage } from './ordersinfo.page';

describe('OrdersinfoPage', () => {
  let component: OrdersinfoPage;
  let fixture: ComponentFixture<OrdersinfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdersinfoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OrdersinfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
