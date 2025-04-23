import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalService, ModalRef } from '../../services/modal.service';
import { MODAL_IDS } from '../../../core/constants/modal.constants';

export interface ConfirmationModalConfig {
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  confirmButtonType?: 'primary' | 'danger' | 'success' | 'warning';
}

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent implements OnInit {
  @Input() title: string = 'Confirmación';
  @Input() message: string = '¿Estás seguro de que quieres realizar esta acción?';
  @Input() confirmText: string = 'Confirmar';
  @Input() cancelText: string = 'Cancelar';
  @Input() confirmButtonType: 'primary' | 'danger' | 'success' | 'warning' = 'primary';

  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  modalId = MODAL_IDS.CONFIRMATION_MODAL;
  isOpen = false;
  modalRef!: ModalRef;

  constructor(private modalService: ModalService) { }

  ngOnInit(): void {
    this.modalService.getModalState(this.modalId).subscribe(isOpen => {
      this.isOpen = isOpen;
      if (isOpen) {
        const data = this.modalService.getModalData(this.modalId) as ConfirmationModalConfig;
        if (data) {
          if (data.title) this.title = data.title;
          if (data.message) this.message = data.message;
          if (data.confirmText) this.confirmText = data.confirmText;
          if (data.cancelText) this.cancelText = data.cancelText;
          if (data.confirmButtonType) this.confirmButtonType = data.confirmButtonType;
        }
        this.modalRef = this.modalService.openModal(this.modalId);
      }
    });
  }

  onConfirm(): void {
    this.confirm.emit();
    this.modalRef?.close(true);
  }

  onCancel(): void {
    this.cancel.emit();
    this.modalRef?.close(false);
  }
}
