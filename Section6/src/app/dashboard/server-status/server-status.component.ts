import { Component, inject, computed } from '@angular/core';
import { ServerStatus } from '../../models';
import { ServerDataService } from '../../server-data.service';

@Component({
  selector: 'app-server-status',
  standalone: true,
  imports: [],
  templateUrl: './server-status.component.html',
  styleUrl: './server-status.component.css',
})
export class ServerStatusComponent {
  serverDataService = inject(ServerDataService);

  currentStatus = computed(this.serverDataService.currentStatus);
}
