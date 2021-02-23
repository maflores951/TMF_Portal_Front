import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigSuaComponent } from './config-sua.component';

describe('ConfigSuaComponent', () => {
  let component: ConfigSuaComponent;
  let fixture: ComponentFixture<ConfigSuaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigSuaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigSuaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
