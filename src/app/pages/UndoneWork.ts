export class UndoneWork {
  // 记录号
  id?: number;
  // 周次
  weekNumber?: number;
  // 内容分析
  workAnalyse?: string;
  // 解决方法
  solution?: string;
  // 编号
  rowIndex?: number;
  weekReportId?: number;
  createdBy?: number;
  createdTime?: string;
  modifiedBy?: number;
  modifiedTime?: string;
  deleted: boolean = false;
}
