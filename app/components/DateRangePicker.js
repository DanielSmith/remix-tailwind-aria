import { useRef } from "react";
import { useDateRangePickerState } from "@react-stately/datepicker";
import { useDateRangePicker } from "@react-aria/datepicker";
import { FieldButton } from "./Button";
import { RangeCalendar } from "./RangeCalendar";
import { DateField } from "./DateField";
import { Popover } from "./Popover";
import { CalendarIcon, ExclamationIcon } from "@heroicons/react/outline";

export function DateRangePicker(props) {
  let state = useDateRangePickerState(props);
  let ref = useRef();
  let {
    groupProps,
    labelProps,
    startFieldProps,
    endFieldProps,
    buttonProps,
    dialogProps,
    calendarProps
  } = useDateRangePicker(props, state, ref);

  return (
    <div className="relative inline-flex flex-col text-left">
      <span {...labelProps} className="text-sm text-gray-800">
        {props.label}
      </span>
      <div {...groupProps} ref={ref} className="flex group">
        <div className="flex bg-white border border-gray-300 group-hover:border-gray-400 transition-colors rounded-l-md pr-10 group-focus-within:border-violet-600 group-focus-within:group-hover:border-violet-600 p-1 relative">
          <DateField {...startFieldProps} />
          <span aria-hidden="true" className="px-2">
            –
          </span>
          <DateField {...endFieldProps} />
          {state.validationState === "invalid" && (
            <ExclamationIcon className="w-6 h-6 text-red-500 absolute right-1" />
          )}
        </div>
        <FieldButton {...buttonProps} isPressed={state.isOpen}>
          <CalendarIcon className="w-5 h-5 text-gray-700 group-focus-within:text-violet-700" />
        </FieldButton>
      </div>
      {state.isOpen && (
        <Popover
          {...dialogProps}
          isOpen={state.isOpen}
          onClose={() => state.setOpen(false)}
        >
          <RangeCalendar {...calendarProps} />
        </Popover>
      )}
    </div>
  );
}
