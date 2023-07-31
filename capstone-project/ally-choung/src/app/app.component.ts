import { Component } from '@angular/core';
import { StateType } from './data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ally-choung';
  selected = StateType.countryMap;

  navClick() {
    console.log('nav clicked');
  }
}
