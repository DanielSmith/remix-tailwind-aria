import { useTabListState } from 'react-stately';
import React, { useEffect, useRef, useState } from 'react';
import { useTab, useTabList, useTabPanel, useFocusRing, mergeProps } from 'react-aria';

export function Tabs(props) {
  let state = useTabListState(props);
  let ref = useRef();
  let { tabListProps } = useTabList(props, state, ref);

  let [activeTabStyle, setActiveTabStyle] = useState({
    width: 0,
    transform: 'translateX(0)',
  });

  useEffect(() => {
    let activeTab = ref.current.querySelector('[role="tab"][aria-selected="true"]');
    setActiveTabStyle({
      width: activeTab?.offsetWidth,
      transform: `translateX(${activeTab?.offsetLeft}px)`,
    });
  }, [state.selectedKey]);

  let { focusProps, isFocusVisible } = useFocusRing({
    within: true,
  });

  return (
    <div className="tabs">
      <div className="tablist-container">
        <div className={`tab-selection ${isFocusVisible ? 'focused' : ''}`} style={{ zIndex: -1, ...activeTabStyle }} />
        <div {...mergeProps(tabListProps, focusProps)} ref={ref}>
          {[...state.collection].map((item) => (
            <Tab key={item.key} item={item} state={state} />
          ))}
        </div>
      </div>
      <TabPanel key={state.selectedItem?.key} state={state} />
    </div>
  );
}

function Tab({ item, state }) {
  let ref = useRef();
  let { tabProps } = useTab(item, state, ref);

  return (
    <div {...tabProps} ref={ref}>
      {item.rendered}
    </div>
  );
}

function TabPanel({ state, ...props }) {
  let ref = useRef();
  let { tabPanelProps } = useTabPanel(props, state, ref);

  return (
    <div {...tabPanelProps} ref={ref}>
      {state.selectedItem?.props.children}
    </div>
  );
}
