import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-definitions',
  templateUrl: './definitions.component.html',
  styleUrls: ['./definitions.component.scss', '../app.component.scss']
})
export class DefinitionsComponent {
  @Input() pointsInfo: [] = [];

}
