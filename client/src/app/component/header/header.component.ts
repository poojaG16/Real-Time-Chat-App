import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ MatIconModule, MatButtonModule, MatToolbarModule, MatTooltipModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  isUserLoggedIn: boolean = false; // This should be set based on your authentication logic
  userName: string = ''; // This should be set based on your user data
  constructor(private router: Router, public userService: UserService) {}

  ngOnInit(){
    this.userService.getCurrentUser().subscribe((user:any) => {
      if(user && user.username) {
        this.isUserLoggedIn = true; // User is logged in
        this.userName = user.username; // Set the username from the user data
      }

    });

  }

  navigateToInfo() {
    this.router.navigate(['/info']); // Adjust the route as needed
  }

  logout() {
    // Perform logout logic (e.g., clearing session)
    this.userService.clearCurrentUser();
    this.router.navigate(['/login']); // Redirect to login page
  }


}
