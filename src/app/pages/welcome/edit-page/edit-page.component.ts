import {Component, Input, OnInit} from '@angular/core';
import {WorkNote} from "../worknote/WorkNote";
import {WorknoteService} from "../worknote/worknote.service";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {DetailsPageComponent} from "../details-page/details-page.component";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit{
  editNote = new WorkNote();
  date: any = new Date();
  saveWorkNote: WorkNote = new WorkNote();
  id:number = 0;

  onOk(result: Date | Date[] | null): void {
    console.log('onOk', result);
  }

  constructor(private workNoteService: WorknoteService,
              private nzNotificationService: NzNotificationService,
              private route: ActivatedRoute
  ) {
    this.id = this.route.snapshot.queryParams['id'];

  }

  ngOnInit(): void {
    this.workNoteService.getWorkNoteById(this.id).subscribe(data => {
      this.editNote = data;
    })
  }

  update() {
    this.editNote.date = this.date.toLocaleString();
    this.workNoteService.updateWorkNote(this.editNote).subscribe(data =>{
      if (data.success) {
        this.nzNotificationService.success('更新成功!!', '');
      }else{
        this.nzNotificationService.error('更新失败!!', '');
      }
    })
  }

  clear(name: HTMLInputElement, step: HTMLInputElement, content: HTMLTextAreaElement, achievements: HTMLTextAreaElement, resource: HTMLTextAreaElement, problem: HTMLTextAreaElement) {
    name.value = '';
    this.date = null;
    step.value = '';
    content.value = '';
    achievements.value = '';
    resource.value = '';
    problem.value = '';

  }

  back() {
    window.history.go(-1);

  }

  delete() {
    this.workNoteService.deleteWorkNote(this.editNote.id!).subscribe(data => {
      if (data.success) {
        this.nzNotificationService.success('删除成功!!', '');
        window.history.go(-1);
      }else{
        this.nzNotificationService.error('删除失败!!', '');
      }
    })
  }
}
