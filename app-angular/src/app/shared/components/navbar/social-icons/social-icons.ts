import { Component, inject, signal } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { SocialItem } from 'src/app/shared/interfaces/social-item.interface';

@Component({
  selector: 'social-icons',
  imports: [],
  templateUrl: './social-icons.html',
  styleUrl: './social-icons.css'
})
export class SocialIcons {
  socialItems = signal<SocialItem[]>([]);

  userService = inject(UserService)
  sessionActive = this.userService.sessionUser

  constructor(){
    this.socialItems.set([
      { id: 1, name: 'WhatsApp', icon: 'fa-brands fa-whatsapp', url: 'https://wa.me/7717742823', newPage: true },
      { id: 2, name: 'Twitter', icon: 'fab fa-facebook', url: 'https://twitter.com/romaga', newPage: true }
    ]);
    if(this.userService.isTokenValid()){
      this.socialItems.update(items => [...items, { id: 5, name: 'Dashboard', icon: 'fa-solid fa-user', url: '/dashboard', newPage: false }]);
    }else{
      this.socialItems.update(items => [...items, { id: 5, name: 'Login', icon: 'fa-solid fa-user', url: '/login', newPage: false }]);
    }
  }
}
