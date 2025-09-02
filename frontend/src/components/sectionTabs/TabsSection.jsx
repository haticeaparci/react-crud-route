import TabsButtonList from "./TabsButtonList";
import { useState } from "react";
import { EXAMPLES } from "../../data.js";
import "./sectiontabs.css";

const TabsSection = () => {
  const tabKeys = Object.keys(EXAMPLES);
  const [selectedTab, setSelectedTab] = useState(null);

  function handleSelect(key) {
    setSelectedTab((prev) => (prev === key ? null : key));
  }

  return (
    <section className="tabs-section">
      <h2>Examples</h2>
      <ul className="tabs-list">
        {tabKeys.map((key) => (
          <TabsButtonList
            key={key}
            onSelect={() => handleSelect(key)}
            isSelected={selectedTab === key}
          >
            {EXAMPLES[key].title}
          </TabsButtonList>
        ))}
      </ul>
      {!selectedTab && <p>Please select a tab to view its content.</p>}
      {selectedTab && (
        <div className="tab-content visible">
          <h3>{EXAMPLES[selectedTab].title}</h3>
          <p>{EXAMPLES[selectedTab].description}</p>
          <pre>
            <code>{EXAMPLES[selectedTab].code}</code>
          </pre>
        </div>
      )}
    </section>
  );
};

export default TabsSection;
