import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {WeekService} from "../week.service";
import {ReportDataVo} from "../ReportDataVo";
import {WeekReport} from "../WeekReport";
import {WeekPlan} from "../WeekPlan";
import {UndoneWork} from "../UndoneWork";
import {User} from "../User";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {NzDatePickerComponent} from "ng-zorro-antd/date-picker";
import {WeekApprove} from "../WeekApprove";

@Component({
  selector: 'app-week-detail',
  templateUrl: './week-detail.component.html',
  styleUrls: ['./week-detail.component.scss']
})
export class WeekDetailComponent implements OnInit {
  id: number;
  weekReport: WeekReport = new WeekReport();
  planList: WeekPlan[] = [];
  undoneList: UndoneWork[] = [];
  lastWeekList: WeekPlan[] = [];
  user:User;
  edit:boolean = true;
  weekNumber?:number;
  rowIndex: number = 1;
  @ViewChild('endDatePicker') endDatePicker!: NzDatePickerComponent;
  weekApprove?:WeekApprove;


  constructor(private route: ActivatedRoute,
              private router:Router,
              private weekService: WeekService,
              private nzNotificationService:NzNotificationService,
              private el:ElementRef) {
    this.id = this.route.snapshot.queryParams['id'];
    this.user = this.weekService.getUser();

  }

  ngOnInit(): void {
    this.weekService.getWeekReportById(this.id).subscribe(data => {
      this.weekReport = data.weekReport!;
      this.undoneList = data.undoneList!;
      this.planList = data.planList!;
      for (let data in this.planList) {
        this.planList[data].deleted = false;
      }
      for (let data in this.undoneList) {
        this.undoneList[data].deleted =false;
      }
      if (this.weekReport.weekNumber&&this.weekReport.name) {
        this.weekNumber = this.weekReport.weekNumber;
        const username = this.weekReport.name;
        this.weekService.getThisWeekPlan(this.weekNumber,username).subscribe(data =>{
          this.lastWeekList = data!;
        });
        this.weekService.getLastWeekApprove(this.weekReport.id!).subscribe(data => {
          this.weekApprove = data;
        })
      }
    });


    }

  onOk(result: Date | Date[] | null): void {
    console.log('onOk', result);
  }

  toEdit() {
    //this.router.navigate(["/week-edit"],{queryParams:{id: this.id}})
    this.edit = false;
    this.el.nativeElement.querySelectorAll('input').forEach( (ele: any) =>{ele.disabled = 'false'})
  }

  submitWeek() {
    if (confirm("确认需要提交吗?")) {
      if (this.weekReport.id && this.weekReport.state) {
        let state = '';
        if (this.weekReport.state == '新增') {
          state = '审批';
        }else if (this.weekReport.state == '待修改') {
          state = '已改';
        }
        this.weekService.updateReportStateToApprove(this.weekReport.id,state).subscribe(data => {
          if (data.code == 200) {
            this.nzNotificationService.success(data.message, "");
            window.location.reload();
          } else {
            this.nzNotificationService.error(data.message, "");
          }
        });
      } else {
        alert("reportId不存在!");
        return;
      }
    }else{
      return;
    }
  }


  addWeekPlan() {
    this.planList.forEach(plan => {
      this.rowIndex = Math.max(this.rowIndex, plan.rowIndex!);
    })
    this.rowIndex++;
    const work = new WeekPlan();
    work.rowIndex = this.rowIndex;
    work.weekNumber = this.weekReport.weekNumber! + 1;
    this.planList.push(work);
  }

  deleteWorkPlan(rowIndex: number) {
    for (let data in this.planList) {
      if (this.planList[data].rowIndex == rowIndex) {
        this.planList[data].deleted = true;
      }
    }
  }

  cancel() {

  }

  delete() {
    if (confirm("确定要删除此周报吗?")) {
      this.weekService.deleteReportDataVo(this.weekReport.id!).subscribe(data => {
        if (data.code == 200) {
          this.nzNotificationService.success(data.message, "");
          this.router.navigate(['/week-search']);
        }else{
          this.nzNotificationService.error(data.message, "");
        }
      })
    }else{
      return;
    }
  }

  planConfirm(number: number) {
    this.deleteWorkPlan(number);
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

  disabledStartDate(end: string) {
    const date2 = new Date(end);
    return (current: Date): boolean => {
      if (!current || !date2) {
        return false;
      } else {
        return current.getTime() > date2.getTime();
      }
    }
  }

  addUndoneWork() {
    this.rowIndex++;
    const undone = new UndoneWork();
    undone.rowIndex = this.rowIndex;
    undone.weekNumber = this.weekNumber;
    this.undoneList.push(undone);
  }

  deleteUndoneWork(rowIndex: number) {
    for (let data in this.undoneList) {
      if (this.undoneList[data].rowIndex == rowIndex) {
        this.undoneList[data].deleted = true;
      }
    }
  }


  undoneConfirm(number: number) {
    this.deleteUndoneWork(number);
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
      this.weekReport.problemSuggest && this.planList[0].work && this.undoneList[0].workAnalyse && this.undoneList[0].solution) {
      return true;
    } else {
      return false;
    }
  }


  toSave() {
    this.weekReport.date = this.weekReport.date.toLocaleString();
    for (let data in this.planList) {
      if (this.planList[data].startTime && this.planList[data].endTime) {
        this.planList[data].startTime = this.planList[data].startTime.toLocaleString();
        this.planList[data].endTime = this.planList[data].endTime.toLocaleString();
      }
    }
    const data = new ReportDataVo();
    data.weekReport = this.weekReport;
    data.planList = this.planList;

    data.undoneList = this.undoneList;
    if (this.checkValue()) {
      this.weekService.updateReportDataVo(data).subscribe(data => {
        if (data.code == 200) {
          this.nzNotificationService.success(data.message, '');
          window.location.reload();
        } else {
          this.nzNotificationService.error(data.message, '');
        }
      })
    } else {
      alert("请输入必要的信息!!")
    }
  }
}


