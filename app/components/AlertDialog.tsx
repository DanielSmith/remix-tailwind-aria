import type { AriaDialogProps } from '@react-types/dialog';
import type { OverlayProps } from '@react-aria/overlays';
import React from 'react';
import { useOverlay, usePreventScroll, useModal, useDialog, FocusScope, mergeProps } from 'react-aria';
import { Button } from './PlainButton';
import { ExclamationIcon } from '@heroicons/react/outline';
import { CSSTransition } from 'react-transition-group';

interface AlertDialogProps extends AriaDialogProps, OverlayProps {
  children: React.ReactNode;
  title: string;
  variant?: 'default' | 'destructive';
  confirmLabel: string;
}

export function AlertDialog(props: AlertDialogProps) {
  let { children, onClose, confirmLabel } = props;

  let ref = React.useRef(null);
  let { overlayProps, underlayProps } = useOverlay(props, ref);
  usePreventScroll();
  let { modalProps } = useModal();
  let { dialogProps, titleProps } = useDialog(
    {
      ...props,
      role: 'alertdialog',
    },
    ref
  );

  return (
    // Animate opacity and backdrop blur of underlay
    <CSSTransition
      in={props.isOpen}
      unmountOnExit
      timeout={{ enter: 0, exit: 250 }}
      classNames={{
        enter: 'opacity-0',
        enterDone: 'opacity-1 backdrop-blur-md transition ease-in',
        exit: 'opacity-0 backdrop-blur-none transition ease-out',
      }}
    >
      <div className="fixed inset-0 flex justify-center z-100 bg-slate-400/20" {...underlayProps}>
        <FocusScope contain restoreFocus autoFocus>
          {/* Animate dialog slightly upward when entering, and downward when exiting. */}
          <CSSTransition
            in={props.isOpen}
            appear
            nodeRef={ref}
            timeout={{ enter: 0, exit: 250 }}
            classNames={{
              appear: 'translate-y-2',
              appearDone: 'translate-y-0 transition ease-in',
              exit: 'translate-y-2 transition ease-out',
            }}
          >
            <div
              {...mergeProps(overlayProps, dialogProps, modalProps)}
              ref={ref}
              className="p-8 max-w-sm bg-white/90 border border-gray-300 shadow-2xl rounded-lg z-1 top-[10%] h-fit max-h-[80vh] relative focus:outline-none"
            >
              {props.variant === 'destructive' && <ExclamationIcon className="w-6 h-6 text-red-500 absolute right-8 top-8" />}
              <h3 {...titleProps} className="text-lg font-medium pb-2">
                {props.title}
              </h3>
              <p className="text-sm text-gray-600">{children}</p>
              <div className="pt-8 flex space-x-3 justify-end">
                <Button onPress={onClose}>Cancel</Button>
                <Button variant={props.variant || 'cta'} onPress={onClose}>
                  {confirmLabel}
                </Button>
              </div>
            </div>
          </CSSTransition>
        </FocusScope>
      </div>
    </CSSTransition>
  );
}
