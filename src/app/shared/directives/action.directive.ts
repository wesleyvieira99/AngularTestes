import { Directive, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
  //mesmo nome da diretiva seja o nome do evento
  selector: '[appAction]'
})
export class ActionDirective {
  //mesmo nome da diretiva seja o nome do evento
  @Output() public appAction: EventEmitter<Event> = new EventEmitter();

  //Hostlistener para que a função seja chamada quando o...
  //evento click for feito...Ele pega esse evento click e joga...
  //na função para trabalhar com esse evento
  @HostListener('click', ['$event'])
  public handleClick(event: Event): void {
    this.appAction.emit(event);
  }

  //Hostlistener para que a função seja chamada quando o...
  //evento keyup for feito...Ele pega esse evento keyup e joga...
  //na função para trabalhar com esse evento
  @HostListener('keyup', ['$event'])
  public handleKeyUp(event: KeyboardEvent): void {
    this.appAction.emit(event);
  }
}
