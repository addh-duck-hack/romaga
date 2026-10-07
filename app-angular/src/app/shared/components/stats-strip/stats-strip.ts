import { Component, ElementRef, OnDestroy, OnInit, PLATFORM_ID, inject, input, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { StatItem } from '../../interfaces/stat-item.interface';

@Component({
  selector: 'stats-strip',
  imports: [],
  templateUrl: './stats-strip.html',
  styleUrl: './stats-strip.css'
})
export class StatsStrip implements OnInit, OnDestroy {
  items = input.required<StatItem[]>();
  variant = input<'dark' | 'light'>('dark');
  animated = input(true);

  private platformId = inject(PLATFORM_ID);
  private host = inject(ElementRef<HTMLElement>);
  private observer?: IntersectionObserver;
  private played = false;

  display = signal<Record<number, string>>({});

  ngOnInit(): void {
    const initial: Record<number, string> = {};
    for (const item of this.items()) {
      initial[item.id] = item.display ?? '0';
    }
    this.display.set(initial);

    if (!isPlatformBrowser(this.platformId)) return;

    if (!this.animated()) {
      this.playAll();
      return;
    }

    this.observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting && !this.played) {
          this.played = true;
          this.playAll();
          this.observer?.disconnect();
        }
      }
    }, { threshold: 0.2 });
    this.observer.observe(this.host.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  private playAll(): void {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    for (const item of this.items()) {
      if (item.display !== undefined || item.value === undefined) continue;
      if (reduce) {
        this.setValue(item.id, item.value, item.suffix);
        continue;
      }
      this.animateItem(item.id, item.value, item.suffix);
    }
  }

  private animateItem(id: number, target: number, suffix?: string): void {
    const duration = 2500;
    let start: number | null = null;
    const step = (ts: number) => {
      if (start === null) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      this.setValue(id, Math.floor(eased * target), suffix);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  private setValue(id: number, value: number, suffix?: string): void {
    this.display.update(current => ({
      ...current,
      [id]: value.toLocaleString('en-US') + (suffix ?? '')
    }));
  }
}
