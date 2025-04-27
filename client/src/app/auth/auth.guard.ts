import { CanActivateFn } from '@angular/router';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService); // Use Angular's inject function to get UserService
  const router = inject(Router); // Create an instance of Router

  const currentUser = userService.getCurrentUserValue(); // Get the current user value from UserService
  if (!currentUser) {
    // If there is no current user, navigate to the login page
    router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false; // Prevent access to the route
  }
  return true;
};
