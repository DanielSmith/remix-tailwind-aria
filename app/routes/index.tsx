import { DateRangePicker } from '~/components/DateRangePicker';
import { DatePicker } from '~/components/DatePicker';
import { now, today, getLocalTimeZone } from '@internationalized/date';

// need to resolve problem with AlertDialog
// see https://gist.github.com/DanielSmith/957a0a0a9d791ab2a95ffb15c5f0e6cd for details
// import { AlertDialog } from '~/components/AlertDialog';
import { Button } from '~/components/PlainButton';

import { DateField } from '~/components/DateField';
import { TimeField } from '~/components/TimeField';

import { Item } from 'react-stately';
import { Tabs } from '~/components/Tabs';

import { ClientOnly } from 'remix-utils';
import { OverlayContainer } from '@react-aria/overlays';

import { useState } from 'react';

export default function Index() {
  let [isOpen, setOpen] = useState(false);

  return (
    <ClientOnly fallback={<p>loading...</p>}>
      {() => (
        <OverlayContainer>
          <div className="ml-12 max-w-1/2 text-teal-700">
            {/* prettier-ignore */}
            <p className="mt-8 mb-8 text-teal-600">
              Here are some examples of components in Remix, built with <a href="https://react-spectrum.adobe.com/react-aria/"
              rel="noreferrer" target="_blank"
              className="text-blue-700 underline">React Aria</a> and <a href="http://tailwindcss.com/" rel="noreferrer" target="_blank" className="text-blue-700 underline">Tailwind CSS</a>.
            </p>
            <p>They are from the tailwind styled examples at Adobe react-aria:</p>
            <ul className="ml-10 list-disc my-4">
              <li>
                <a target="_blank" href="https://react-spectrum.adobe.com/react-aria/useDateRangePicker.html">
                  useDateRangePicker and useDatePicker
                </a>
              </li>
              <li>
                <a target="_blank" href="https://react-spectrum.adobe.com/react-aria/useDateField.html">
                  useDateField
                </a>
              </li>
              <li>
                <a target="_blank" href="https://react-spectrum.adobe.com/react-aria/useTimeField.html">
                  useTimeField
                </a>
              </li>
              <li>
                <a target="_blank" href="https://react-spectrum.adobe.com/react-aria/useTabList.html">
                  useTabList
                </a>
              </li>
              <li>
                Not working: AlertDialog - this would be from{' '}
                <a target="_blank" href="https://react-spectrum.adobe.com/react-aria/useDialog.html">
                  useDialog
                </a>
              </li>
            </ul>

            <hr></hr>

            <h2 className="mb-2 font-bold text-xl text-left">DatePicker</h2>
            <DatePicker label="Appointment date" minValue={today(getLocalTimeZone())} />
            <h2 className="my-6 mb-2 font-bold text-xl text-left">DateRangePicker</h2>
            <DateRangePicker label="Trip dates" minValue={today(getLocalTimeZone())} />

            <h2 className="my-6 mb-2 font-bold text-xl text-left">DateField</h2>
            <DateField label="Appointment date" />
            <DateField label="Appointment date and time" placeholderValue={now(getLocalTimeZone())} className="mt-4" />
            <h2 className="my-6 mb-2 font-bold text-xl text-left">TimeField</h2>
            <TimeField label="Appointment time" />
          </div>

          <div className="w-1/2 ml-10 mt-10 text-teal-600">
            <h2 className="mb-2 font-bold text-xl text-left">Tabs</h2>
            <Tabs>
              <Item title="Recent">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias nulla ipsa ullam sequi perferendis quasi quibusdam pariatur architecto dolorum esse, consequatur hic vero non? Quo
                rem facere pariatur quisquam eligendi.
              </Item>
              <Item title="Favorites">Favorites</Item>
              <Item title="All">All</Item>
            </Tabs>
          </div>

          <div className="flex flex-col items-center max-w-lg mx-auto">
            {/* for more info about why AlertDialog is broken, see https://gist.github.com/DanielSmith/957a0a0a9d791ab2a95ffb15c5f0e6cd */}
            {/* prettier-ignore */}
            {/* <p className="mt-8 mb-16 text-gray-600">This sandbox shows an example <strong><code>AlertDialog</code></strong> component built with <a href="https://react-spectrum.adobe.com/react-aria/" rel="noreferrer" target="_blank" className="text-blue-700 underline">React Aria</a> and <a href="http://tailwindcss.com/" rel="noreferrer" target="_blank" className="text-blue-700 underline">Tailwind CSS</a> using the <code>useDialog</code> hook. It also uses <a href="https://reactcommunity.org/react-transition-group/" rel="noreferrer" target="_blank" className="text-blue-700 underline">React Transition Group</a> for CSS animations.</p>
            <Button variant="cta" onPress={() => setOpen(true)}>
              Delete…
            </Button> */}

            {/* <AlertDialog isOpen={isOpen} title="Delete folder" confirmLabel="Delete" variant="destructive" onClose={() => setOpen(false)}>
              Are you sure you want to delete the number 42?
            </AlertDialog> */}
          </div>
        </OverlayContainer>
      )}
    </ClientOnly>
  );
}
