export interface AboutValue {
  title: string;
  description: string;
}

export interface AboutContent {
  title: string;
  introduction: string;
  mission?: string;
  vision?: string;
  values?: AboutValue[];
  capabilities?: string[];
}
