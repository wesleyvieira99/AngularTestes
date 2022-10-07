import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-photo-frame',
  templateUrl: './photo-frame.component.html',
  styleUrls: ['./photo-frame.component.scss']
})

export class PhotoFrameComponent implements OnInit, OnDestroy {
  @Output() public liked: EventEmitter<void> = new EventEmitter();
  @Input() public description = '';
  @Input() public src = '';
  @Input() public likes = 0;
  //Subject abaixo do rxjs
  private debounceSubject: Subject<void> = new Subject();
  private unsubscribe: Subject<void> = new Subject();

  //quando o componente inicializar...
  //criar meu Subject como um Observable e ter um tempo de...
  //debounce (delay para ser chamado) de 500 milissegundos...
  //depois do debounce, meu subject pode executar a função destinada
  public ngOnInit(): void {
    this.debounceSubject
      .asObservable()
      .pipe(debounceTime(500))
      //fique inscrito nesse método de debounce até o unsubscribe ser chamado para desinscrever a este observable.
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(() => this.liked.emit());
  }

  //Quando o componente for destruído, dê um unsubscribe no Observable de debounce

  public ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  //usando o método para emitir o evento desejado com o tratamento de debounce
  public like(): void {
    this.debounceSubject.next();
  }
}
