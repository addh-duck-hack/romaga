import { Component, input } from '@angular/core';
import { SectionItem } from '../../interfaces/section-separator.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'section-separator',
  imports: [RouterLink],
  templateUrl: './section-separator.html',
  styleUrl: './section-separator.css'
})

export class SectionSeparator {
  section = input.required<SectionItem>();
}
