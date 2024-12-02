import { inject, Injectable, signal } from '@angular/core';

import { Place } from './place.model';
import { HttpClient } from '@angular/common/http';
import { map, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private httpClient = inject(HttpClient);
  private userPlaces = signal<Place[]>([]);

  loadedUserPlaces = this.userPlaces.asReadonly();

  loadAvailablePlaces() {
    return this.httpClient
      .get<{ places: Place[] }>('http://localhost:3000/places')
      .pipe(
        map((res) => res.places),
        catchError((error) => {
          console.log(error);
          return throwError(() => new Error('something wrong has occurred'));
        })
      );
  }

  loadUserPlaces() {
    return this.httpClient
      .get<{ places: Place[] }>('http://localhost:3000/user-places')
      .pipe(
        map((res) => res.places),
        catchError((error) => {
          console.log(error);
          return throwError(() => new Error('something wrong has occurred'));
        })
      );
  }

  addPlaceToUserPlaces(place: Place) {
    return this.httpClient.put('http://localhost:3000/user-places', {
      placeId: place.id,
    });
  }

  removeUserPlace(place: Place) {}
}
