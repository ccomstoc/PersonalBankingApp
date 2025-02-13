import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatagorizeComponent } from './catagorize.component';

describe('CatagorizeComponent', () => {
  let component: CatagorizeComponent;
  let fixture: ComponentFixture<CatagorizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatagorizeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatagorizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
