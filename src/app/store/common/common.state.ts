export interface CommonState {
  isLoadingPage: boolean;
  modals: {
    [key: string]: {
      isOpen: boolean;
      data?: any;
    }
  };
}
