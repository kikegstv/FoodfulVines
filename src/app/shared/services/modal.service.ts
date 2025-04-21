import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface ModalConfig {
  id: string;
  data?: any;
}

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modalsState = new BehaviorSubject<{ [key: string]: boolean }>({});
  private modalData = new Map<string, any>();

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

  openModal(modalId: string, data?: any): void {
    const currentState = this.modalsState.value;
    this.modalsState.next({ ...currentState, [modalId]: true });

    if (data) {
      this.modalData.set(modalId, data);
    }
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
