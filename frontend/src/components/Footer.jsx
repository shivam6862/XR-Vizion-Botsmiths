import React from "react";
import classes from "@/styles/footer.module.css";
import ContactLogo from "@/components/ContactLogo";

const footer_Items = [
  {
    category: "Product",
    subcategories: ["Benefits", "Features", "Dynamic Responses"],
  },
  {
    category: "Integrations",
    subcategories: ["Customer Support", "Education", "Integrations"],
  },
  {
    category: "Chat Services",
    subcategories: ["Chat Widget", "LiveChat", "Shopify"],
  },
  {
    category: "Resources",
    subcategories: ["Help Center", "ChatBot Academy", "Blog", "System Status"],
  },
  {
    category: "Company",
    subcategories: ["About", "Partner Program", "Careers", "Legal"],
  },
];

const Footer = () => {
  return (
    <div className={classes.container} id="contact">
      <div className={classes.box}>
        <div className={classes.bottom}>
          {footer_Items.map((category) => (
            <div key={category.category} className={classes.bottom_items_box}>
              <h2>{category.category}</h2>
              <div className={classes.bottom_items}>
                {category.subcategories.map((subcategory) => (
                  <div key={subcategory} className={classes.bottom_item}>
                    {subcategory}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className={classes.bottom_footer}>
          <div className={classes.bottom_footer_left}>
            <p>Start your free trail</p>
            <button>Sign up free</button>
          </div>
          <div className={classes.bottom_footer_right}>
            <ContactLogo size={25} rotate={0} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
