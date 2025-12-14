import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { StudentService } from '../../services/student-service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css'], // corrected property name
})
export class Register {
  email = signal('');
  password = signal('');
  message = signal('');

  constructor(private service: StudentService, private router: Router) {}

  register() {
    this.service.register(this.email(), this.password()).subscribe({
      next: (res: any) => {
        this.message.set(res.message); // success message

        // Optional delay so user sees message
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1500);
      },
      error: (err: any) => {
        // Properly handle backend messages
        if (err.status === 409) {
          this.message.set(err.error?.message || 'User already exists');
        } else if (err.status === 400 && Array.isArray(err.error)) {
          this.message.set(err.error.map((e: any) => e.description).join(', '));
        } else {
          this.message.set(err.error?.message || 'Registration failed');
        }
      },
    });
  }
}
