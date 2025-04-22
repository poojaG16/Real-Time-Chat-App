import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router, RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, MatInputModule, MatButtonModule, MatCardModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username!: string;
  password!: string;

  constructor(private _userService: UserService, private router: Router){}

  onLogin(){
    const credentials = { username: this.username, password: this.password };
    this._userService.login(credentials).subscribe(
      (response: any) => {
        alert('Login successful!');
        this._userService.setCurrentUSer(credentials.username);
        this.router.navigate(['/chat']); // Redirect to chat
      },
      (error: any) => {
        console.log("ERror: ", error)
        alert(`Error: ${JSON.stringify(error)}`);
      }
    );

  }
}
