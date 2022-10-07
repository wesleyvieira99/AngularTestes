import { TestBed } from '@angular/core/testing';
//dependencia para fazer testes com requisições HTTP
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PhotoBoardService } from './photo-board.service';

//dado mockado para teste
const mockData = {
  //sempre bater com o endereço que é chamado na 
  //requisição ao back end com o service testado aqui
  api: 'http://localhost:3000/photos', 
  data: [
    {
      id: 1,
      description: 'example1',
      src: ''
    },
    {
      id: 2,
      description: 'example2',
      src: ''
    }
  ]
}

describe(PhotoBoardService.name, () => {

  let service: PhotoBoardService;
  let httpController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PhotoBoardService]
    });
    //servico de pegar fotos do backend
    service = TestBed.inject(PhotoBoardService);
    //dependencia HTPP do Angular de teste para podermos controlar requisição HTTP pro back-end
    httpController = TestBed.inject(HttpTestingController);
  });

  //checar se teve alguma requisição pós teste que não teve uma resposta
  afterEach(() => httpController.verify());

  it(`#${PhotoBoardService.prototype.getPhotos.name} should return list of photos 
    with description in UpperCase`, done => {
      
      service.getPhotos().subscribe(photos => {
        expect(photos[0].description).toBe('EXAMPLE1');
        expect(photos[1].description).toBe('EXAMPLE2');
        done();
      });

      httpController
      //1.se uma requisição for feita nesse valor de URL que está em mockData.api
        .expectOne(mockData.api) 
      //2. então faço a requisição com esses dados de mockData.data
        .flush(mockData.data);
        
    });
});