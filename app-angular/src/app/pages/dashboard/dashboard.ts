import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'dashboard',
  imports: [RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export default class Dashboard {
  userService = inject(UserService);
  router = inject(Router)

  constructor(){
    if(!this.userService.isTokenValid()){
      this.router.navigate(['/']);
    }
  }
}
