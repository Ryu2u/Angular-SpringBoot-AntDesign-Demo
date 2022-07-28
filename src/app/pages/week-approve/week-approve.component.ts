import {Component, OnInit} from '@angular/core';
import {WeekReport} from "../WeekReport";
import {WeekPlan} from "../WeekPlan";
import {UndoneWork} from "../UndoneWork";
import {User} from "../User";
import {ActivatedRoute, Router} from "@angular/router";
import {WeekService} from "../week.service";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {WeekApprove} from "../WeekApprove";

@Component({
  selector: 'app-week-approve',
  templateUrl: './week-approve.component.html',
  styleUrls: ['./week-approve.component.scss']
})
export class WeekApproveComponent implements OnInit {
  id: number;
  weekReport: WeekReport = new WeekReport();
  planList: WeekPlan[] = [];
  undoneList: UndoneWork[] = [];
  lastWeekList: WeekPlan[] = [];
  user: User;
  date: Date = new Date();
  weekApprove: WeekApprove = new WeekApprove();

  constructor(private route: ActivatedRoute,
              private router: Router,
              private weekService: WeekService,
              private nzNotificationService: NzNotificationService) {
    this.id = this.route.snapshot.queryParams['id'];

    this.user = this.weekService.getUser();

  }

  ngOnInit(): void {
    this.weekService.getWeekReportById(this.id).subscribe(data => {
      this.weekReport = data.weekReport!;
      this.undoneList = data.undoneList!;
      this.planList = data.planList!;
      if (this.weekReport.weekNumber && this.weekReport.name&&this.weekReport.id) {
        const weekNumber = this.weekReport.weekNumber;
        const username = this.weekReport.name;
        this.weekService.getThisWeekPlan(weekNumber,username).subscribe(data =>{
          this.lastWeekList = data!;
        })
        this.weekService.getLastWeekApprove(this.weekReport.id).subscribe(data => {
          this.weekApprove.lastComment = data.comment!
        })
      }
    });


  }


  approveWeek(isApproved: number) {
    if (confirm("确定需要审核吗?")) {
      if (!this.weekApprove.comment) {
        alert("请输入批示内容!");
        return;
      }
      const time = new Date().toLocaleString();
      this.weekApprove.weekReportId = this.weekReport.id;
      this.weekApprove.isApproved = isApproved;
      this.weekApprove.createdBy = this.user.id;
      this.weekApprove.createdTime = time;
      this.weekApprove.modifiedBy = this.user.id;
      this.weekApprove.modifiedTime = time;
      this.weekService.changeReportState(this.weekApprove).subscribe(data => {
        if (data.code == 200) {
          this.nzNotificationService.success(data.message, '');
          this.router.navigate(['/week-search']);
        } else {
          this.nzNotificationService.error(data.message, '');
        }
      })
    }

  }
}
