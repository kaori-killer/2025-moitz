import { ReactNode } from 'react';

let mountFn: ((id: string, element: ReactNode) => void) | null = null;
let unmountFn: ((id: string) => void) | null = null;
let idCounter = 0;

export function setModalFunctions(
  mount: (id: string, element: ReactNode) => void,
  unmount: (id: string) => void,
) {
  mountFn = mount;
  unmountFn = unmount;
}

export const modal = {
  open: (render: (props: { unmount: () => void }) => ReactNode) => {
    if (!mountFn || !unmountFn) {
      throw new Error('ModalProvider가 필요합니다.');
    }

    const id = `modal-${idCounter++}`;
    const unmount = () => {
      unmountFn(id);
    };

    const element = render({ unmount });
    mountFn(id, element);

    return unmount;
  },
};
