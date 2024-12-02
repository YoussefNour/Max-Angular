import { computed, Injectable, signal } from '@angular/core';
import { ServerStatus, Traffic } from './models';

@Injectable({ providedIn: 'root' })
export class ServerDataService {
  dummyTrafficData = signal<Traffic[]>([
    {
      id: 'd1',
      value: 433,
    },
    {
      id: 'd2',
      value: 260,
    },
    {
      id: 'd3',
      value: 290,
    },
    {
      id: 'd4',
      value: 410,
    },
    {
      id: 'd5',
      value: 397,
    },
    {
      id: 'd6',
      value: 488,
    },
    {
      id: 'd47',
      value: 589,
    },
  ]);

  maxTraffic = computed(() =>
    Math.max(...this.dummyTrafficData().map((data) => data.value))
  );

  currentStatus = signal<ServerStatus>('online');

  constructor() {
    setInterval(
      (that: any) => {
        that.currentStatus.set(
          that.currentStatus() === 'online' ? 'offline' : 'online'
        );
      },
      2000,
      this
    );
  }
}
