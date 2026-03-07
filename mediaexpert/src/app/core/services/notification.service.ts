import { Injectable, signal } from '@angular/core';

export interface Toast {
  message: string;
  type: 'success' | 'danger' | 'info';
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  toast = signal<Toast | null>(null);

  private displayTime = 5000;

  show(message: string, type: 'success' | 'danger' | 'info' = 'success') {
    this.toast.set({ message, type });
    setTimeout(() => {
      this.clear();
    }, this.displayTime);
  }

  clear() {
    this.toast.set(null);
  }
}
