import {
  Component,
  DestroyRef,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { interval, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  private customInterval$ = new Observable((subscriber) => {
    setInterval(() => {
      subscriber.next({ newValue: 'hello there' });
    }, 1000);
  });
  ngOnInit(): void {
    let temp = this.customInterval$.subscribe({
      next: (val) => console.log(val),
    });
    this.destroyRef.onDestroy(() => temp.unsubscribe());
  }
}
