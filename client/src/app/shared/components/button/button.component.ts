import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-button',
  imports: [
    CommonModule,
    MatIconModule
  ],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() color: 'primary' | 'secondary' = 'primary';
  @Input() disabled: boolean = false;
  @Input() icon: string = '';
  @Input() iconPosition: 'left' | 'right' = 'left';
  @Input() fullWidth: boolean = false;
  @Output() clicked: EventEmitter<void> = new EventEmitter<void>();

  get buttonClasses() {
    return {
      [`btn-${this.color}`]: true,
      'icon-right': this.iconPosition === 'right'
    };
  }

  get customStyles() {
    return this.fullWidth ? { width: '100%' } : {};
  }

  onClick(): void {
    if (!this.disabled) {
      this.clicked.emit();
    }
  }
}