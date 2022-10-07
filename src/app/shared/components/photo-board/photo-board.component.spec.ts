import { PhotoBoardmodule } from './photo-board.module';
import { SimpleChange, SimpleChanges } from '@angular/core';
import { buildPhotoList } from './test/build-photos-list';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PhotoBoardComponent } from './photo-board.component';


describe(PhotoBoardComponent.name, () => {

  let fixture: ComponentFixture<PhotoBoardComponent>;
  let component: PhotoBoardComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotoBoardmodule]
    }).compileComponents();

    fixture = TestBed.createComponent(PhotoBoardComponent);
    component = fixture.componentInstance;
  });

  it(`Should display rows and columns when @(Input photos) has value`, () => {
    component.photos = buildPhotoList();
    fixture.detectChanges();
    //Chamando na munheca o ngOnChanges
    //Precisando instanciar uma SimpleChange
    const change: SimpleChanges = {
      photos: new SimpleChange([], component.photos, true)
    }
    component.ngOnChanges(change);

    expect(component.rows.length)
      .withContext('Number of rows')
      .toBe(2)

    expect(component.rows[0].length)
      .withContext('Number of columns from the first rows')
      .toBe(4)

    expect(component.rows[1].length)
      .withContext('Number of columns from the second rows')
      .toBe(4)
  })
})
