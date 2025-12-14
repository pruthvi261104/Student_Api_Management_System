import { Component, signal } from '@angular/core';
import { StudentService } from '../../services/student-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  username = signal('');
  password = signal('');
  error = signal('');

  constructor(private service: StudentService, private router: Router) {}

  login() {
    this.service.login(this.username(), this.password()).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/students']);
      },
      error: () => {
        this.error.set('Invalid credentials');
      },
    });
  }
}
