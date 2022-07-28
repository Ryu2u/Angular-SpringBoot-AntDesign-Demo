import {Component, OnInit} from '@angular/core';
import {SearchReportVo} from "../SearchReportVo";
import {WeekReport} from "../WeekReport";
import {WeekService} from "../week.service";
import {Router} from "@angular/router";
import {User} from "../User";
import * as buffer from "buffer";

@Component({
  selector: 'app-week-search',
  templateUrl: './week-search.component.html',
  styleUrls: ['./week-search.component.scss']
})
export class WeekSearchComponent {
  dateList?: Date[] | null;
  searchReport: SearchReportVo = new SearchReportVo();
  reportList: WeekReport[] = [];
  user:User;
  listOfColum = [
    {
      title: "姓名",
      compare: null,
      priority: 5
    },
    {
      title: "部门",
      compare: null,
      priority: 4
    },
    {
      title: "周次",
      compare: (a:WeekReport,b:WeekReport) => a.weekNumber! - b.weekNumber!,
      priority: 7
    },
    {
      title: "达成率",
      compare: (a:WeekReport,b:WeekReport) => a.achieveRate! - b.achieveRate!,
      priority: 6
    },
    {
      title: "周报状态",
      compare: null,
      priority: 3
    },
    {
      title: "审阅者",
      compare: null,
      priority: 2
    }
  ]

  constructor(private weekService:WeekService,
              private router:Router) {
    this.weekService.getWeekReport(this.searchReport).subscribe(data => this.reportList = data);

    this.user = this.weekService.getUser();

  }




  toDetail(id:number) {
    this.router.navigate(['/week-detail'],{queryParams:{"id":id}})
  }

  toApproval(id:number) {
    this.router.navigate(['/week-approve'],{queryParams:{'id':id}})
  }

  clear() {
    this.searchReport = new SearchReportVo();
    this.dateList = null;
  }

  search() {
    if (this.dateList) {
    this.searchReport.startDate = this.dateList[0].toLocaleString();
    this.searchReport.endDate = this.dateList[1].toLocaleString();
    }
    this.weekService.getWeekReport(this.searchReport).subscribe(data => this.reportList = data);

  }
}
