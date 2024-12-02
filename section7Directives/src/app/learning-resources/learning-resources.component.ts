import { Component } from '@angular/core';
import { SafeLinkDirective } from '../Directives/safe-link-directive';
import { LogDirective } from '../Directives/log.directive';

@Component({
  selector: 'app-learning-resources',
  templateUrl: './learning-resources.component.html',
  styleUrl: './learning-resources.component.css',
  standalone: true,
  imports: [SafeLinkDirective, LogDirective],
})
export class LearningResourcesComponent {}
