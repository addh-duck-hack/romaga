import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'image-card',
  imports: [],
  templateUrl: './image-card.html',
  styleUrl: './image-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageCard {}
