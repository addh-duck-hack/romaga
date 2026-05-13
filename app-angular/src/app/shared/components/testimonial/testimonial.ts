import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'testimonial',
  imports: [],
  templateUrl: './testimonial.html',
  styleUrl: './testimonial.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Testimonial {}
