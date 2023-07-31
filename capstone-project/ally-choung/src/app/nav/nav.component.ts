import { Component, EventEmitter, Input, Output } from '@angular/core';
import { State, StateType } from '../data';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss', '../app.component.scss']
})
export class NavComponent {
  state: StateType = StateType.countryMap; 
  @Output() stateChange: EventEmitter<StateType> = new EventEmitter<StateType>();

  onClick(type: StateType) {
    this.state = type; 
    this.stateChange.emit(type);
  }
}
