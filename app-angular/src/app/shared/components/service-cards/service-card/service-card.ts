import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SectionItem } from 'src/app/shared/interfaces/service-item.interface';

@Component({
  selector: 'service-card',
  imports: [RouterLink],
  templateUrl: './service-card.html',
  styleUrl: './service-card.css'
})
export class ServiceCard {
  card = input.required<SectionItem>();
}
