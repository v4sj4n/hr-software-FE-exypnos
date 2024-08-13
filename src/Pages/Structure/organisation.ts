export interface Product {
    name: string;
  }
  
  export interface Account {
    name: string;
    product: Product;
  }
  
  export interface Organization {
    tradingName: string;
    account?: Account[];
    organizationChildRelationship?: Organization[];
  }
  