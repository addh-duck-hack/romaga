import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';



@Component({
  selector: 'main-menu',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './main-menu.html',
  styleUrl: './main-menu.css'
})
export class MainMenu {
  arrayMenu: String[] = ['Home Principal', 'Team', 'Projects', 'Calendar'];
}
