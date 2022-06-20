import ProductPp from "../../../../images/icons/product-pp.svg";
import ProductEe from "../../../../images/icons/product-ee.svg";
import ProductCc from "../../../../images/icons/product-cc.svg";
import ProductSc from "../../../../images/icons/product-sc.svg";
import ProductIg from "../../../../images/icons/product-ig.svg";

export const data = [
  {
    id: 1,
    name: "Payment Module",
    image: ProductPp,
    tag: true,
    meta: {
      version: "1.3.1",
      status: "Active",
      button: "Settings",
    },
  },
  {
    id: 2,
    name: "Export Modules",
    image: ProductEe,
    meta: {
      version: "1.3.1",
      status: "Inactive",
      button: "Enable",
    },
  },
  {
    id: 3,
    name: "Cleaner Modules",
    image: ProductCc,
    meta: {
      version: "1.7.2",
      status: "Inactive",
      button: "Enable",
    },
  },
  {
    id: 4,
    name: "SMS Service",
    image: ProductSc,
    meta: {
      version: "1.1",
      status: "Active",
      button: "Options",
    },
  },
  {
    id: 5,
    name: "Bulk Email Send",
    image: ProductIg,
    meta: {
      version: "1.4.2",
      status: "Active",
      button: "Options",
    },
  },
];
