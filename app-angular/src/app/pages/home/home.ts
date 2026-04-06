import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Navbar } from '../../shared/navbar/navbar';

@Component({
  selector: 'app-home',
  imports: [Navbar],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Home { }
