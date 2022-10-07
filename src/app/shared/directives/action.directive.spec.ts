import { ActionDirectiveModule } from './action.module';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ActionDirective } from './action.directive';
import { Component } from '@angular/core';

describe(ActionDirective.name, () => {

  let fixture: ComponentFixture<ActionDirectiveTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActionDirectiveTestComponent],
      imports: [ActionDirectiveModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ActionDirectiveTestComponent);
  });

  it(`(D) (@Output appAction) should emit event with payload when ENTER key is pressed`, () => {
    const divEl: HTMLElement = fixture.nativeElement.querySelector('.dummy-component');
    const event = new KeyboardEvent('keyup', {key: 'Enter'});
    divEl.dispatchEvent(event);
    expect(fixture.componentInstance.hasEvent);
  })

  it(`(D) (@Output appAction) should emit event with payload when CLICKED`, () => {
    const divEl: HTMLElement = fixture.nativeElement.querySelector('.dummy-component');
    const event = new Event('click');
    divEl.dispatchEvent(event);
    expect(fixture.componentInstance.hasEvent);
  })
});

//Componente dummy fake
@Component({
  template: `<div class="dummy-component" (appAction)="actionHandler($event)"></div>`
})
class ActionDirectiveTestComponent {

  private event: Event = null;
  public actionHandler(event: Event): void {
    this.event = event;
  }

  public hasEvent(): boolean {
    return !!this.event;
  }
}
