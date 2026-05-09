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
  @Input() clientes: number = 217;
  @Input() servicios: number = 1974;
  contCli: number = 0;
  contServ: number = 0;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    interval(20)
      .pipe(takeWhile(() => this.contCli < this.clientes))
      .subscribe(() => {
        this.contCli++;
        this.cdr.detectChanges();
      });

    interval(20)
      .pipe(takeWhile(() => this.contServ < this.servicios))
      .subscribe(() => {
        this.contServ++;
        this.cdr.detectChanges();
      });
  }
}
