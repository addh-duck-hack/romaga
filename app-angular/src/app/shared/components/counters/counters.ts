import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { interval, takeWhile } from 'rxjs';

@Component({
  selector: 'counters',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './counters.html',
  styleUrls: ['./counters.css']
})
export class CountersComp implements OnInit {
  @Input() kilometros: number = 150000;
  @Input() litros: number = 1974;
  @Input() maniobras: number = 2800;

  contKil: number = 0;
  contlit: number = 0;
  contMani: number = 0;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    const duration = 2500; // ms
    const step = this.kilometros / duration;
    interval(1)
      .pipe(takeWhile(() => this.contKil < this.kilometros))
      .subscribe(() => {
        this.contKil += step;
        this.cdr.detectChanges();
      });

    interval(1)
      .pipe(takeWhile(() => this.contlit < this.litros))
      .subscribe(() => {
        this.contlit++;
        this.cdr.detectChanges();
      });

    interval(1)
      .pipe(takeWhile(() => this.contMani < this.maniobras))
      .subscribe(() => {
        this.contMani++;
        this.cdr.detectChanges();
      });
  }
}
