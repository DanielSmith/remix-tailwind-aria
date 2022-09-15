import { useRef } from "react";
import { useLocale } from "@react-aria/i18n";
import { useDateFieldState } from "@react-stately/datepicker";
import { useDateField } from "@react-aria/datepicker";
import { createCalendar } from "@internationalized/date";
import { DateSegment } from "./DateSegment";

export function DateField(props) {
  let { locale } = useLocale();
  let state = useDateFieldState({
    ...props,
    locale,
    createCalendar
  });

  let ref = useRef();
  let { labelProps, fieldProps } = useDateField(props, state, ref);

  return (
    <div className={`flex flex-col items-start ${props.className || ""}`}>
      <span {...labelProps} className="text-sm text-gray-800">
        {props.label}
      </span>
      <div
        {...fieldProps}
        ref={ref}
        className="flex bg-white border border-gray-300 hover:border-gray-400 transition-colors rounded-md pr-8 focus-within:border-violet-600 focus-within:hover:border-violet-600 p-1"
      >
        {state.segments.map((segment, i) => (
          <DateSegment key={i} segment={segment} state={state} />
        ))}
      </div>
    </div>
  );
}
