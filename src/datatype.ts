export interface DataModalInterface {
  rows: DataChildModalInterface[];
}

export interface DataChildModalInterface {
  id: string;
  label: string;
  value: number;
  varience: number;
  children: DataColumnDataInterface[];
}

export interface DataColumnDataInterface {
  id: string;
  label: string;
  value: number;
  varience: number;
}

export enum UpdateActionEnum {
  percentage = "percentage",
  value = "value",
}

export interface UpdateDataInterface {
  action: UpdateActionEnum;
  parentId?: string;
  id: string;
  allocateValue: number;
}
