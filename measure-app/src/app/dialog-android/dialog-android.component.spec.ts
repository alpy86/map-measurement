import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAndroidComponent } from './dialog-android.component';

describe('DialogAndroidComponent', () => {
  let component: DialogAndroidComponent;
  let fixture: ComponentFixture<DialogAndroidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAndroidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAndroidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
