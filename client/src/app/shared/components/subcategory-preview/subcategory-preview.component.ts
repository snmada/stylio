import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-subcategory-preview',
  imports: [
    CommonModule
  ],
  templateUrl: './subcategory-preview.component.html',
  styleUrl: './subcategory-preview.component.scss'
})
export class SubcategoryPreviewComponent {
  @Input() imageSrc!: string;
  @Input() name!: string;
  @Input() imageSize: number = 50;
  @Input() textSize: number = 18;
  @Input() cursorPointer: boolean = false;
  @Input() showBorderOnHover: boolean = false;

  get subcategoryPreviewClasses() {
    return {
      'subcategory-preview': true,
      'cursor-pointer': this.cursorPointer,
      'border-on-hover': this.showBorderOnHover
    };
  }
}