import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Trip } from '../models/trip';
import { AuthenticationService } from '../services/authentication.service';
import { TripDataService } from '../services/trip-data.service';

@Component({
  selector: 'app-edit-trip',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-trip.component.html',
  styleUrl: './edit-trip.component.css'
})
export class EditTripComponent implements OnInit {
  public editForm!: FormGroup;
  public trip!: Trip;
  public submitted = false;
  public message = '';
  private tripCode = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private tripDataService: TripDataService
  ) { }

  ngOnInit(): void {
    if (!this.authenticationService.isLoggedIn()) {
      this.router.navigate(['login']);
      return;
    }

    const tripCode = this.route.snapshot.paramMap.get('tripCode') || localStorage.getItem('tripCode');
    if (!tripCode) {
      alert('Something went wrong. No trip code was selected.');
      this.router.navigate(['']);
      return;
    }
    localStorage.setItem('tripCode', tripCode);
    this.tripCode = tripCode;

    this.editForm = this.formBuilder.group({
      _id: [],
      code: [tripCode, Validators.required],
      name: ['', Validators.required],
      length: ['', Validators.required],
      start: ['', Validators.required],
      resort: ['', Validators.required],
      perPerson: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required]
    });

    this.tripDataService.getTrip(tripCode)
      .subscribe({
        next: (value: Trip) => {
          this.trip = value;
          this.editForm.patchValue({
            ...value,
            start: this.formatDateForInput(value.start)
          });
          this.message = `Trip ${tripCode} retrieved.`;
        },
        error: (error: unknown) => {
          this.message = 'No trip retrieved.';
          console.log('Error: ', error);
        }
      });
  }

  public onSubmit(): void {
    this.submitted = true;
    if (this.editForm.valid) {
      this.tripDataService.updateTrip(this.tripCode, this.editForm.getRawValue())
        .subscribe({
          next: () => this.router.navigate(['']),
          error: (error: unknown) => console.log('Error: ', error)
        });
    }
  }

  public cancel(): void {
    this.router.navigate(['']);
  }

  private formatDateForInput(value: string): string {
    if (!value) {
      return '';
    }
    return new Date(value).toISOString().slice(0, 10);
  }

  get f() { return this.editForm.controls; }
}
