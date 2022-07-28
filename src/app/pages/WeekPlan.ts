export class WeekPlan {
  id?:number;
  weekNumber?:number;
  rowIndex?:number;
  work?:string;
  startTime?:any;
  endTime?:any;
  comment?:string;
  weekReportId?:number;
  createdBy?:number
  createdTime?:string
  modifiedBy?:number
  modifiedTime?:string
  deleted:boolean = false;
}

