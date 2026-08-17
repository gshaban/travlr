import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { Trip } from '../models/trip';
import { AuthenticationService } from '../services/authentication.service';
import { TripDataService } from '../services/trip-data.service';
import { TripCardComponent } from '../trip-card/trip-card.component';

@Component({
  selector: 'app-trip-listing',
  standalone: true,
  imports: [CommonModule, TripCardComponent],
  providers: [TripDataService],
  templateUrl: './trip-listing.component.html',
  styleUrl: './trip-listing.component.css'
})
export class TripListingComponent implements OnInit {
  public trips: Trip[] = [];
  public message = 'Loading trips from the API...';

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private tripDataService: TripDataService
  ) { }

  ngOnInit(): void {
    this.getTrips();
  }

  public addTrip(): void {
    if (!this.isLoggedIn()) {
      this.router.navigate(['login']);
      return;
    }

    this.router.navigate(['add-trip']);
  }

  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  public refreshTrips(): void {
    this.getTrips();
  }

  private getTrips(): void {
    this.tripDataService.getTrips()
      .subscribe({
        next: (value: Trip[]) => {
          this.trips = value;
          this.message = value.length > 0
            ? `There are ${value.length} trips available.`
            : 'There were no trips retrieved from the database.';
        },
        error: (error: unknown) => {
          this.message = 'Unable to retrieve trips from the API.';
          console.log('Error: ', error);
        }
      });
  }
}
