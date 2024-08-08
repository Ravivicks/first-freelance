import { menuItems } from "@/lib/data";
import React from "react";

const Footer = () => {
  return (
    <footer className="border-t-2 bg-slate-200 px-6 pb-16">
      <div className="flex justify-between flex-col md:flex-row">
        {menuItems.map((item) => (
          <div key={item.title} className="mt-6">
            <h1 className="text-lg font-bold mb-3 ">{item.title}</h1>
            {item.subMenu.map((submenu) => (
              <p
                key={submenu.title}
                className="text-muted-foreground my-1 text-md"
              >
                {submenu.title}
              </p>
            ))}
          </div>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
