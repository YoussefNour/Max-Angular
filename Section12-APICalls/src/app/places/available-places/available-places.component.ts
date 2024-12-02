import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';

import { Place } from '../place.model';
import { PlacesComponent } from '../places.component';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { catchError, map, throwError } from 'rxjs';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-available-places',
  standalone: true,
  templateUrl: './available-places.component.html',
  styleUrl: './available-places.component.css',
  imports: [PlacesComponent, PlacesContainerComponent],
})
export class AvailablePlacesComponent implements OnInit {
  private placesService = inject(PlacesService);
  private destroyRef = inject(DestroyRef);
  ngOnInit(): void {
    this.fetchAvailablePlaces();
  }
  places = signal<Place[] | undefined>(undefined);
  isFetching = signal(false);
  error = signal('');

  fetchAvailablePlaces() {
    this.isFetching.set(true);
    let sub = this.placesService.loadAvailablePlaces().subscribe({
      next: (res) => this.places.update(() => res),
      error: (err: Error) => {
        this.error.set(err.message);
      },
      complete: () => {
        this.isFetching.set(false);
      },
    });
    this.destroyRef.onDestroy(() => sub.unsubscribe);
  }

  onSelectPlace(selectedPlace: Place) {
    let sub = this.placesService
      .addPlaceToUserPlaces(selectedPlace)
      .subscribe();
    this.destroyRef.onDestroy(() => sub.unsubscribe());
  }
}
