export interface NavLink {
  label: string;
  href: string;
}

export interface SiteSettings {
  companyName: string;
  legalName: string;
  tagline: string;
  description: string;
  email: string;
  phone: string;
  address: string;
  abn?: string;
  socials?: {
    linkedin?: string;
    facebook?: string;
    instagram?: string;
  };
  navLinks: NavLink[];
}
