import {Component, OnInit, ViewChild} from '@angular/core';
import {WeekReport} from "../WeekReport";
import {WeekPlan} from "../WeekPlan";
import {WeekService} from "../week.service";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {NzDatePickerComponent} from "ng-zorro-antd/date-picker";
import {UndoneWork} from "../UndoneWork";
import {ReportDataVo} from "../ReportDataVo";
import {User} from "../User";
import {Router} from "@angular/router";

@Component({
  selector: 'app-week-report',
  templateUrl: './work-report.component.html',
  styleUrls: ['./work-report.component.scss']
})
export class WorkReportComponent {

  weekNumber?: number;
  date: any = new Date();
  weekReport: WeekReport = new WeekReport();
  reportDataList: WeekPlan[] = [];
  planDataList: WeekPlan[] = [];
  rowIndex = 1;
  nextWeekNumber: number;
  user: User;
  @ViewChild('endDatePicker') endDatePicker!: NzDatePickerComponent;
  undoneDataList: UndoneWork[] = [];


  constructor(private weekService: WeekService,
              private nzNotificationService: NzNotificationService,
              private router: Router) {
    this.weekNumber = this.weekService.getWeekNumber();
    this.weekReport.weekNumber = this.weekNumber;
    this.weekReport.approver = '张三';
    this.weekReport.state = '新增';
    this.user = this.weekService.getUser();

    const work = new WeekPlan();
    work.rowIndex = this.rowIndex;
    this.nextWeekNumber = this.weekService.getWeekNumber() + 1;
    work.weekNumber = this.nextWeekNumber;
    this.planDataList.push(work);

    const undone = new UndoneWork();
    undone.weekNumber = this.weekNumber;
    undone.rowIndex = this.rowIndex;
    this.undoneDataList.push(undone);
    this.weekService.getThisWeekPlan(this.weekNumber!, this.user.username!).subscribe(data => this.reportDataList = data);

  }


  onOk(result: Date | Date[] | null): void {
    console.log('onOk', result);
  }

  checkValue(): boolean {
    if (
      this.weekReport.weekNumber &&
      this.weekReport.name &&
      this.weekReport.duty &&
      this.weekReport.date &&
      this.weekReport.achieveRate &&
      this.weekReport.state &&
      this.weekReport.approver &&
      this.weekReport.mondayWork &&
      this.weekReport.tuesdayWork &&
      this.weekReport.wednesdayWork &&
      this.weekReport.thursdayWork &&
      this.weekReport.fridayWork &&
      this.weekReport.saturdayWork &&
      this.weekReport.sundayWork &&
      this.weekReport.experienceHarvest &&
      this.weekReport.problemSuggest && this.planDataList[0].work && this.undoneDataList[0].workAnalyse && this.undoneDataList[0].solution) {
      if (this.weekReport.mondayWork.length <= 120 &&
        this.weekReport.tuesdayWork.length <= 120 &&
        this.weekReport.wednesdayWork.length <= 120 &&
        this.weekReport.thursdayWork.length <= 120 &&
        this.weekReport.fridayWork.length <= 120 &&
        this.weekReport.saturdayWork.length <= 120 &&
        this.weekReport.sundayWork.length <= 120 &&
        this.weekReport.experienceHarvest.length <= 150 &&
        this.weekReport.problemSuggest.length <= 150
      ) {
        for (let data in this.planDataList) {
          if (this.planDataList[data].work!.length > 80 || this.planDataList[data].comment!.length > 80) {
            alert("下周工作计划内容和备注必须小于[80]个字符");
            return false;
          }
        }
        for (let data in this.undoneDataList) {
          if (this.undoneDataList[data].workAnalyse!.length > 120 || this.undoneDataList[data].solution!.length > 120) {
            alert("本周未完成工作内容必须小于[120]个字符");
            return false;
          }
        }
        return true;
      } else {
        alert("周工作内容长度必须小于120个字符,心得收获和问题建议长度必须小于150个字符");
        return false;

      }
    } else {
      return false;
    }
  }

  saveWeekReport() {
    this.weekReport.name = this.user.username;
    this.weekReport.duty = this.user.department;
    if (this.date) {
      this.weekReport.date = this.date.toLocaleString();
    } else {
      this.weekReport.date = null;
    }
    for (let data in this.planDataList) {
      if (this.planDataList[data].startTime && this.planDataList[data].endTime) {
        this.planDataList[data].startTime = this.planDataList[data].startTime.toLocaleString();
        this.planDataList[data].endTime = this.planDataList[data].endTime.toLocaleString();
      }
    }
    const data = new ReportDataVo();
    data.weekReport = this.weekReport;
    data.planList = this.planDataList;
    data.undoneList = this.undoneDataList;
    data.createdBy = this.user.id;
    if (this.checkValue()) {
      this.weekService.addReportDataVo(data).subscribe(data => {
        if (data.code == 200) {
          this.nzNotificationService.success(data.message, '');
          const id = data.obj;
          this.router.navigate(['/week-detail'], {queryParams: {id: id}})
        } else if (data.obj) {
          this.nzNotificationService.error(data.message, '');
          this.router.navigate(['/week-detail'], {queryParams: {id: data.obj}})
        } else {
          this.nzNotificationService.error(data.message, '');

        }
      })
    } else {
      alert("请输入必要的信息!!")
    }
  }

  addWeekPlan() {
    this.rowIndex++;
    const work = new WeekPlan();
    work.rowIndex = this.rowIndex;
    work.weekNumber = this.nextWeekNumber;
    this.planDataList.push(work);
  }

  deleteWorkPlan(rowIndex: number) {
    if (rowIndex == 1 || !rowIndex) {
      return;
    }
    this.planDataList = this.planDataList.filter(data => data.rowIndex != rowIndex);
  }

  cancel() {

  }

  planConfirm(number: number) {
    this.deleteWorkPlan(number);
  }

  saveWeekPlan() {
    for (let data in this.planDataList) {
      this.planDataList[data].startTime = this.planDataList[data].startTime.toLocaleString();
      this.planDataList[data].endTime = this.planDataList[data].endTime.toLocaleString();
    }
    this.weekService.addWeekPlan(this.planDataList).subscribe(data => {
      if (data.success) {
        this.nzNotificationService.success("添加成功!!", '');
      } else {
        this.nzNotificationService.error("添加失败!!", '');
      }
    })

  }

  disabledStartDate(end: string) {
    const date2 = new Date(end);
    const now = new Date();
    return (current: Date): boolean => {
      if (!current || !date2) {
        return false;
      } else {
        return current.getTime() > date2.getTime();
      }
    }
  }

  disabledEndDate(start: string) {
    const date1 = new Date(start);
    return (current: Date): boolean => {
      if (!current || !date1) {
        return false;
      } else {
        return current.getTime() <= date1.getTime();
      }
    }
  }


  addUndoneWork() {
    this.rowIndex++;
    const undone = new UndoneWork();
    undone.rowIndex = this.rowIndex;
    undone.weekNumber = this.weekNumber;
    this.undoneDataList.push(undone);
  }

  deleteUndoneWork(rowIndex: number) {
    if (rowIndex == 1 || !rowIndex) {
      return;
    }
    this.undoneDataList = this.undoneDataList.filter(data => data.rowIndex != rowIndex);
  }


  undoneConfirm(number: number) {
    this.deleteUndoneWork(number);
  }

  saveUndoneWork() {
    this.weekService.addUndoneWork(this.undoneDataList).subscribe(data => {
      if (data.success) {
        this.nzNotificationService.success("添加成功!!", '');
      } else {
        this.nzNotificationService.error("添加失败!!", '');
      }
    })

  }


  cancelDate() {
    this.date = null;
  }
}
