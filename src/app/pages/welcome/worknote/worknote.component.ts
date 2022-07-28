import {Component} from '@angular/core';
import {WorknoteService} from "./worknote.service";
import {WorkNote} from "./WorkNote";
import {NzSafeAny} from "ng-zorro-antd/core/types";

@Component({
  selector: 'app-worknote',
  templateUrl: './worknote.component.html',
  styleUrls: ['./worknote.component.css']
})
export class WorknoteComponent {
  dataList: WorkNote[] = [];
  workNote: WorkNote = new WorkNote();
  date: any = null;
  listOfColum = [
    {
      title:"记录号",
      compare : (a:WorkNote,b:WorkNote) => a.id! - b.id!,
      priority:7
    },
    {
      title:"日期",
      compare : null,
      priority:6
    },
    {
      title:"姓名",
      compare : null,
      priority:5
    },
    {
      title:"工作阶段",
      compare : null,
      priority:4
    },
    {
      title:"工作内容",
      compare : null,
      priority:3
    },
    {
      title:"成果",
      compare : null,
      priority:2
    },
    {
      title:"资源",
      compare : null,
      priority:1
    },
    {
      title:"问题",
      compare : (a:WorkNote,b:WorkNote) => a.id! - b.id!,
      priority:1
    },
  ];


  constructor(private workNoteService: WorknoteService) {
    workNoteService.getUsers().subscribe(data => {
      this.dataList = data
    });

  }


  search(name: string, step: string, content: string, achievements: string, resource: string, problem: string) {
    const workNote = new WorkNote();
    workNote.name = name;
    if (this.date != null) {
      workNote.date = this.date.toLocaleString();
    }
    workNote.projectStep = step;
    workNote.workContent = content;
    workNote.achievements = achievements;
    workNote.resource = resource;
    workNote.problem = problem;
    this.workNoteService.getWorkNote(workNote).subscribe(data => this.dataList = data);
  }


  clear(name: HTMLInputElement, step: HTMLInputElement, content: HTMLInputElement, achievements: HTMLInputElement,
        resource: HTMLInputElement, problem: HTMLInputElement) {
    name.value = "";
    this.date = null;
    step.value = "";
    content.value = "";
    achievements.value = "";
    resource.value = "";
    problem.value = "";
  }


  onOk(result: Date | Date[] | null): void {
    console.log('onOk', result);
  }




}
