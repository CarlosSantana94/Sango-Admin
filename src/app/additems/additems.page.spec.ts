import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdditemsPage } from './additems.page';

describe('AdditemsPage', () => {
  let component: AdditemsPage;
  let fixture: ComponentFixture<AdditemsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdditemsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdditemsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
