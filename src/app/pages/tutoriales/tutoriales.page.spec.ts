import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TutorialesPage } from './tutoriales.page';

describe('TutorialesPage', () => {
  let component: TutorialesPage;
  let fixture: ComponentFixture<TutorialesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TutorialesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TutorialesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
