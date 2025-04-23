import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

export interface ModalConfig {
  id: string;
  data?: any;
}

export class ModalRef {
  private _result = new Subject<any>();
  private _modalId: string;

  constructor(modalId: string, private modalService: ModalService) {
    this._modalId = modalId;
  }

  close(result?: any): void {
    this._result.next(result);
    this._result.complete();
    this.modalService.closeModal(this._modalId);
  }

  get result(): Observable<any> {
    return this._result.asObservable();
  }
}

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modalsState = new BehaviorSubject<{ [key: string]: boolean }>({});
  private modalData = new Map<string, any>();
  private modalRefs = new Map<string, ModalRef>();

  constructor() { }

  getModalState(modalId: string): Observable<boolean> {
    return new Observable<boolean>(observer => {
      this.modalsState.subscribe(state => {
        observer.next(state[modalId] || false);
      });
    });
  }

  getAllModalStates(): Observable<{ [key: string]: boolean }> {
    return this.modalsState.asObservable();
  }

  openModal(modalId: string, data?: any): ModalRef {
    const currentState = this.modalsState.value;
    this.modalsState.next({ ...currentState, [modalId]: true });

    if (data) {
      this.modalData.set(modalId, data);
    }

    if (!this.modalRefs.has(modalId)) {
      this.modalRefs.set(modalId, new ModalRef(modalId, this));
    }

    return this.modalRefs.get(modalId)!;
  }

  closeModal(modalId: string): void {
    const currentState = this.modalsState.value;
    const newState = { ...currentState };
    delete newState[modalId];
    this.modalsState.next(newState);
  }

  closeAllModals(): void {
    this.modalsState.next({});
  }

  getModalData(modalId: string): any {
    return this.modalData.get(modalId);
  }
}
