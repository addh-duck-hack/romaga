import { Component } from '@angular/core';
import { Navbar } from '../../shared/components/navbar/navbar';

@Component({
  selector: 'home',
  imports: [Navbar],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export default class Home { }
