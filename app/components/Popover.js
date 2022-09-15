import { useRef } from "react";
import { FocusScope } from "@react-aria/focus";
import { useDialog } from "@react-aria/dialog";
import { useOverlay, useModal, DismissButton } from "@react-aria/overlays";
import { mergeProps } from "@react-aria/utils";

export function Popover(props) {
  let ref = useRef();
  let { popoverRef = ref, isOpen, onClose, children, ...otherProps } = props;

  // Handle events that should cause the popup to close,
  // e.g. blur, clicking outside, or pressing the escape key.
  let { overlayProps } = useOverlay(
    {
      isOpen,
      onClose,
      shouldCloseOnBlur: true,
      isDismissable: true
    },
    popoverRef
  );

  let { modalProps } = useModal();
  let { dialogProps } = useDialog(otherProps, popoverRef);

  // Add a hidden <DismissButton> component at the end of the popover
  // to allow screen reader users to dismiss the popup easily.
  return (
    <FocusScope contain restoreFocus>
      <div
        {...mergeProps(overlayProps, modalProps, dialogProps)}
        ref={popoverRef}
        className="absolute top-full bg-white border border-gray-300 rounded-md shadow-lg mt-2 p-8 z-10"
      >
        {children}
        <DismissButton onDismiss={onClose} />
      </div>
    </FocusScope>
  );
}
