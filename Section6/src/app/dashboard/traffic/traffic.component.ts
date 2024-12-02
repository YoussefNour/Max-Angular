import { Component, inject, input } from '@angular/core';
import { Traffic } from '../../models';
import { ServerDataService } from '../../server-data.service';

@Component({
  selector: 'app-traffic',
  standalone: true,
  imports: [],
  templateUrl: './traffic.component.html',
  styleUrl: './traffic.component.css',
})
export class TrafficComponent {
  serverDataService = inject(ServerDataService);

  trafficValues = this.serverDataService.dummyTrafficData();
  maxTraffic = this.serverDataService.maxTraffic();
}
