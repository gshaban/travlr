import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { AuthenticationService } from '../services/authentication.service';
import { TripDataService } from '../services/trip-data.service';

@Component({
  selector: 'app-add-trip',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-trip.component.html',
  styleUrl: './add-trip.component.css'
})
export class AddTripComponent implements OnInit {
  public addForm!: FormGroup;
  public submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private tripService: TripDataService
  ) { }

  ngOnInit(): void {
    if (!this.authenticationService.isLoggedIn()) {
      this.router.navigate(['login']);
      return;
    }

    this.addForm = this.formBuilder.group({
      _id: [],
      code: ['', Validators.required],
      name: ['', Validators.required],
      length: ['', Validators.required],
      start: ['', Validators.required],
      resort: ['', Validators.required],
      perPerson: ['', Validators.required],
      image: ['reef1.jpg', Validators.required],
      description: ['', Validators.required]
    });
  }

  public onSubmit(): void {
    this.submitted = true;
    if (this.addForm.valid) {
      this.tripService.addTrip(this.addForm.value)
        .subscribe({
          next: () => this.router.navigate(['']),
          error: (error: unknown) => console.log('Error: ', error)
        });
    }
  }

  public cancel(): void {
    this.router.navigate(['']);
  }

  get f() { return this.addForm.controls; }
}
