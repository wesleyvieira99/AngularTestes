import { element } from 'protractor';
import { PhotoFrameModule } from './photo-frame.module';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { PhotoFrameComponent } from './photo-frame.component';

describe(PhotoFrameComponent.name, () => {
  let fixture: ComponentFixture<PhotoFrameComponent> = null;
  let component: PhotoFrameComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotoFrameModule]
    }).compileComponents();

    fixture = TestBed.createComponent(PhotoFrameComponent);
    component = fixture.componentInstance;
  })

  it('Should create component', () => {
    expect(component).toBeTruthy();
  });

  //teste usando o fakeAsync para controlar o tempo de execução
  it(`#${PhotoFrameComponent.prototype.like.name}
  should trigger (@Outuput liked) once when called
  multiple times within debounce time`, fakeAsync(() => {
    fixture.detectChanges();
    //número de vezes que o liked foi chamado
    let times = 0;
    component.liked.subscribe(() => times++)
    component.like();
    component.like();
    tick(500); //parar execução do teste por 500 mls.
    expect(times).toBe(1);
  }));

  it(`#${PhotoFrameComponent.prototype.like.name}
  should trigger (@Outuput liked) twice when
  called outside debounce time`, fakeAsync(() => {
    fixture.detectChanges();
    //número de vezes que o liked foi chamado
    let times = 0;
    component.liked.subscribe(() => times++)
    component.like();
    tick(500); //parar execução do teste por 500 mls.
    component.like();
    tick(500); //parar execução do teste por 500 mls.
    expect(times).toBe(2);
  }));

  it(`should dispay number of likes when likes (@Input likes)
  is incremented`, () => {
    fixture.detectChanges();
    component.likes++;
    //chamando o detected changes novamente para que o Angular
    //redesenhe o DOM pois mexemos no incremento que...
    //que é apresentado no DOM
    fixture.detectChanges();
    //elemento do DOM <span></span> que contém o counter com o incremento likes
    const element: HTMLElement = fixture.nativeElement.querySelector('like-counter');
    expect(element.textContent.trim()).toBe('1');
    //vale lembrar que esse textContent retorna uma string
    //temos que testar e comparar esse textcontent com uma string também
  });

  it(`Should update aria-label when (@Input likes) is updated`, () => {
    fixture.detectChanges();
    component.likes++;
    fixture.detectChanges();

    const element: HTMLElement = fixture.nativeElement.querySelector('span');
    //testando se esse span tem o atributo de acessibilidade de aria-label.
    expect(element.getAttribute('aria-label')).toBe('1: people liked');

  });

  it(`Should  aria-label with default (@Input likes) value with 0`, () => {
    fixture.detectChanges();
    component.likes++;
    fixture.detectChanges();

    const element: HTMLElement = fixture.nativeElement.querySelector('span');
    //testando se esse span tem o atributo de acessibilidade de aria-label.
    expect(element.getAttribute('aria-label')).toBe('0: people liked');

  })
})
