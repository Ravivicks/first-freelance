// components/Tabs.tsx
import { FC } from "react";

interface Tab {
  value: string;
  label: string;
}

interface TabsProps {
  tabs: Tab[];
  value: string;
  onChange: (value: string) => void;
}

const Tabs: FC<TabsProps> = ({ tabs, value, onChange }) => {
  return (
    <div className="w-[400px]">
      <div className="rounded-full bg-white border flex">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            className={`rounded-full px-4 py-2 ${
              value === tab.value ? "bg-blue-500 text-white" : ""
            }`}
            onClick={() => onChange(tab.value)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
