import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink, MatInputModule, MatButtonModule, MatCardModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  username: string = '';
  password: string = '';

  constructor(private userService: UserService, private router: Router) { }

  onRegister(): void {
    const userDetails = { username: this.username, password: this.password };
    this.userService.register(userDetails).subscribe(
      (response) => {
        alert('Registration successful! Please login.');
        this.router.navigate(['/login']); // Redirect to login
      },
      (error) => {
        alert('Registration failed. Please try a different username.');
      }
    );
  }

}
