import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {WorkNote} from "./WorkNote";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type":"application/json"
  })
}

@Injectable({
  providedIn: 'root'
})
export class WorknoteService {
  serverURL = "http://localhost:8080"

  constructor(private http:HttpClient) { }

  /**
   * 获取所有note集合
   */
  getUsers(): Observable<WorkNote[]> {
    return this.http.post<WorkNote[]>(this.serverURL+"/note/list",httpOptions);
  }

  /**
   * 根据给定条件查询note
   * @param workNote
   */
  getWorkNote(workNote: WorkNote): Observable<WorkNote[]> {
    return this.http.post<WorkNote[]>(this.serverURL+"/note/list",workNote,httpOptions)

  }

  /**
   * 添加note
   * @param workNote
   */
  saveWorkNote(workNote: WorkNote): Observable<any> {
    return this.http.post<any>(this.serverURL + "/note/save", workNote, httpOptions);

  }

  /**
   * 更新note
   * @param workNote
   */
  updateWorkNote(workNote: WorkNote): Observable<any> {
    return this.http.put(this.serverURL + "/note/update", workNote, httpOptions);
  }

  /**
   * 根据主键获取note
   * @param id
   */
  getWorkNoteById(id:number):Observable<WorkNote> {
    return this.http.post(this.serverURL + "/note/find/" + id, httpOptions);
  }

  deleteWorkNote(id:number):Observable<any>{
    return this.http.delete(this.serverURL + "/note/del/" + id, httpOptions);
  }



}
