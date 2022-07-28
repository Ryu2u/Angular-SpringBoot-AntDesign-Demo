import {WeekReport} from "./WeekReport";
import {WeekPlan} from "./WeekPlan";
import {UndoneWork} from "./UndoneWork";

export class ReportDataVo {
  /**
   * 周报
   */
  weekReport?: WeekReport;
  /**
   * 下周工作计划
   */
  planList?: WeekPlan[]
  /**
   * 未完成工作
   */
  undoneList?: UndoneWork[];
  /**
   * 创建人id
   */
  createdBy?:number;

}
