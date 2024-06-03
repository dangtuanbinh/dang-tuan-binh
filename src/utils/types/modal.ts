export interface dialogObj {
  content: any;
  title?: any;
  isOpen?: boolean;
  maskClosable?: boolean;
  confirmText?: string;
  closeText?: string;
  type?: string;
  actionConfirm?: any;
  actionCancel?: any;
  actionAfterClose?: any;
}

export interface modalObj {
  template: string;
  data: object;
  isOpen: boolean;
  size?: string;
}

export interface userObject {
  userId: number;
  status: string;
}
