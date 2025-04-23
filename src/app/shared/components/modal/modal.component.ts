import { Component, Input, Output, EventEmitter, ElementRef, HostListener, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonFacade } from '../../../facades/common.facade';
import { MODAL_IDS } from '../../../core/constants/modal.constants';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, OnDestroy {
  @Input() modalId: string = MODAL_IDS.DEFAULT;
  @Input() set isVisible(value: boolean) {
    if (value !== this._isVisible) {
      this._isVisible = value;
      this.isVisibleChange.emit(value);

      if (value && this.modalId) {
        this.commonFacade.openModal(this.modalId);
      } else if (!value && this.modalId) {
        this.commonFacade.closeModal(this.modalId);
      }
    }
  }

  get isVisible(): boolean {
    return this._isVisible;
  }

  private _isVisible: boolean = false;
  @Output() isVisibleChange = new EventEmitter<boolean>();

  private subscription: Subscription = new Subscription();

  constructor(
    private elementRef: ElementRef,
    private commonFacade: CommonFacade
  ) {}

  ngOnInit(): void {
    if (this.modalId) {
      this.subscription.add(
        this.commonFacade.getModalState(this.modalId).subscribe(isOpen => {
          if (isOpen !== this._isVisible) {
            this._isVisible = isOpen;
            this.isVisibleChange.emit(isOpen);
          }
        })
      );
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent): void {
    const clickedInside = this.elementRef.nativeElement.querySelector('.modal__content').contains(event.target as Node);
    if (!clickedInside && this.isVisible && event.target === event.currentTarget) {
      this.close();
    }
  }

  close(): void {
    if (this.modalId) {
      this.commonFacade.closeModal(this.modalId);
    } else {
      this._isVisible = false;
      this.isVisibleChange.emit(false);
    }
  }
}
