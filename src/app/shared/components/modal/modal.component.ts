import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Input() isVisible: boolean = false;
  @Output() isVisibleChange = new EventEmitter<boolean>();

  constructor() {
    console.log('ModalComponent created');
  }

  close(): void {
    this.isVisible = false;
    this.isVisibleChange.emit(this.isVisible);
  }
}
