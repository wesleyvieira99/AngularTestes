import { PhotoBoardService } from './../../shared/components/photo-board/services/photo-board.service';
import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ComponentFixture } from '@angular/core/testing';
import { PhotoListComponent } from './photo-list.component';
import { PhotoListModule } from './photo-list.module';import { buildPhotoList } from 'src/app/shared/components/photo-board/test/build-photos-list';
import { of } from 'rxjs';
7

//Teste de escopo de página

describe(PhotoListComponent.name, () => {
    let fixture: ComponentFixture<PhotoListComponent>;
    let component: PhotoListComponent;
    let service: PhotoBoardService; //injetando um service que já vem com o PhotoListModule
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [
          PhotoListModule,
          HttpClientModule
        ]
      }).compileComponents();

      fixture = TestBed.createComponent(PhotoListComponent);
      component = fixture.componentInstance;
      service = TestBed.inject(PhotoBoardService);
    });

    it('Should create component', () => {
      expect(component).toBeTruthy();
    });

    it(`[D] Should display board when data arrives`, () => {
      const photos = buildPhotoList();
      //espiando o método getPhotos do serviço de photos
      //usando o .and e .returnValue para
      //além de espiar esse servico de pegar fotos
      //retornar uma lista de photos que foi construída com o
      //buildPhotoList como Observable
      spyOn(service, 'getPhotos')
        .and.returnValue(of(photos))
      fixture.detectChanges();
      //Se estou exibindo o elemento vai aparecer esse elemento
      const board = fixture.nativeElement
        .querySelector('app-photo-board');
      const loader = fixture.nativeElement
        .querySelector('.loader');

      //Se tenho dado, o board está sendo visualizado
      expect(board).not.toBeNull();
      //Se tenho o dado, o loader não será visualizado
      expect(loader).toBeNull();
    })

    it(`[D] Should display loader while waiting for data`, () => {
      const photos = buildPhotoList();
      //espiando o método getPhotos do serviço de photos
      //usando o .and e .returnValue para
      //além de espiar esse servico de pegar fotos
      //retornar uma lista de photos que foi construída com o
      //buildPhotoList como Observable
      spyOn(service, 'getPhotos')
        .and.returnValue(null);
      fixture.detectChanges();
      //Se estou exibindo o elemento vai aparecer esse elemento
      const board = fixture.nativeElement
        .querySelector('app-photo-board');
      const loader = fixture.nativeElement
        .querySelector('.loader');

      //Se tenho dado, o board está sendo visualizado
      expect(loader).not.toBeNull();
      //Se tenho o dado, o loader não será visualizado
      expect(board).toBeNull();
    })
});
