import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestingFreezeComponent } from './testing-freeze.component';

describe('TestingFreezeComponent', () => {
  let component: TestingFreezeComponent;
  let fixture: ComponentFixture<TestingFreezeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestingFreezeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestingFreezeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
