import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientUserinfoComponent } from './userinfo.component';

describe('ClientUserinfoComponent', () => {
  let component: ClientUserinfoComponent;
  let fixture: ComponentFixture<ClientUserinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientUserinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientUserinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
