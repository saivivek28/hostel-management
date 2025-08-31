import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessGalleryComponent } from './mess-gallery.component';

describe('MessGalleryComponent', () => {
  let component: MessGalleryComponent;
  let fixture: ComponentFixture<MessGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessGalleryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
