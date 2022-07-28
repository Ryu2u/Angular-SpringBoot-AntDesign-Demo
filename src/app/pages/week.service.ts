import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {WeekReport} from "./WeekReport";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {WeekPlan} from "./WeekPlan";
import {UndoneWork} from "./UndoneWork";
import {ReportDataVo} from "./ReportDataVo";
import {getISOWeek} from "date-fns";
import {SearchReportVo} from "./SearchReportVo";
import {User} from "./User";
import {WeekApprove} from "./WeekApprove";

const serviceURL = "http://localhost:8080";

const httpOptions = {
  headers:{
    'content-type': 'application/json',
  }
}

@Injectable({
  providedIn: 'root'
})
export class WeekService {
  weekNumber: number;



  constructor(private http: HttpClient) {
    const date = new Date("2022-8-24 00:00:00");
    this.weekNumber = getISOWeek(date);

  }

  getWeekNumber(): number {
    return this.weekNumber;
  }

  getUser():User{
    return JSON.parse(localStorage.getItem('user')!);
  }



  addWeekPlan(weekPlan: WeekPlan[]): Observable<any> {

    return this.http.post<any>(serviceURL + "/week/plan/add", weekPlan, httpOptions);

  }

  addUndoneWork(undoneWorkList: UndoneWork[]): Observable<any> {

    return this.http.post<any>(serviceURL + "/week/undone/add", undoneWorkList, httpOptions);

  }

  addReportDataVo(data: ReportDataVo): Observable<any> {

    return this.http.post<any>(serviceURL + "/week/add", data, httpOptions);

  }

  getWeekReport(searchReportVo: SearchReportVo): Observable<WeekReport[]> {


    return this.http.post<WeekReport[]>(serviceURL + "/week/report/search", searchReportVo, httpOptions);

  }

  getWeekReportById(id: number): Observable<ReportDataVo> {

    return this.http.get<ReportDataVo>(serviceURL + "/week/report/search/" + id, httpOptions);

  }

  updateReportDataVo(reportDataVo: ReportDataVo): Observable<any> {

    return this.http.put<any>(serviceURL + "/week/report/update", reportDataVo, httpOptions);

  }

  changeReportState(approve: WeekApprove): Observable<any> {

    return this.http.post<any>(serviceURL + "/week/approve/state", approve, httpOptions);

  }


  updateReportStateToApprove(id: number, state: string): Observable<any> {

    return this.http.post<any>(serviceURL + "/week/report/state/" + id + "/" + state, httpOptions);

  }


  getThisWeekPlan(number: number, username: string) {

    return this.http.get<any>(serviceURL + "/week/plan/" + number + "/" + username, httpOptions);

  }

  deleteReportDataVo(id: number): Observable<any> {

    return this.http.delete<any>(serviceURL + "/week/report/delete/" + id, httpOptions);

  }

  getLastWeekApprove(reportId: number): Observable<WeekApprove> {

    return this.http.post<WeekApprove>(serviceURL + "/week/approve/comment/" + reportId, httpOptions);

  }


}
