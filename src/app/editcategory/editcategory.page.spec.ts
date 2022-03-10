import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditcategoryPage } from './editcategory.page';

describe('EditcategoryPage', () => {
  let component: EditcategoryPage;
  let fixture: ComponentFixture<EditcategoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditcategoryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditcategoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
