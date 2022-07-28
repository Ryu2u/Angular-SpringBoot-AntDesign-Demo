import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import {NzFormTooltipIcon} from 'ng-zorro-antd/form';
import {WorkNote} from "../worknote/WorkNote";
import {WorknoteService} from "../worknote/worknote.service";
import {NzNotificationService} from "ng-zorro-antd/notification";

@Component({
  selector: 'app-save-page',
  templateUrl: './save-page.component.html',

  styleUrls: ['./save-page.component.css']
})
export class SavePageComponent {
  date: any = new Date();
  saveWorkNote:WorkNote = new WorkNote();
  validateFrom: FormGroup;
  flag = false;
  onOk(result: Date | Date[] | null): void {
    console.log('onOk', result);
  }

  constructor(private workNoteService: WorknoteService,
              private nzNotificationService: NzNotificationService,
              private builder: FormBuilder) {
    this.validateFrom = this.builder.group({
      nameInput: ['',[Validators.required]],
      startDate: [''||null,[Validators.required]],
      stepInput: [''||null,[Validators.required]],
      contentInput: [""||null,[Validators.required]],
      achInput: [''||null,[Validators.required]],
      resInput: [''||null,[Validators.required]],
      proInput: [''||null, [Validators.required]],
    })
  }


  save(name: string, step: string, content: string, achievements: string, resource: string, problem: string) {
    for (const i in this.validateFrom.controls) {
      if (i) {
        this.validateFrom.controls[i].markAsDirty();
        this.validateFrom.controls[i].updateValueAndValidity();
      }
    }
    if (this.validateFrom.invalid) {
      return;
    }
      this.saveWorkNote.name = name;
      this.saveWorkNote.date = this.date.toLocaleString();
      this.saveWorkNote.projectStep = step;
      this.saveWorkNote.workContent = content;
      this.saveWorkNote.achievements = achievements;
      this.saveWorkNote.resource = resource;
      this.saveWorkNote.problem = problem;
      this.workNoteService.saveWorkNote(this.saveWorkNote).subscribe(data =>{
        if (data.success) {
          this.nzNotificationService.success('添加成功!!', '');
          this.flag = true;

        }else{
          this.nzNotificationService.error('添加失败!!', '');
        }
      })


  }

  clear(name: any, step: HTMLInputElement, content: HTMLTextAreaElement, achievements: HTMLTextAreaElement, resource: HTMLTextAreaElement, problem: HTMLTextAreaElement) {
    name.value = null;
    this.date = null;
    step.value = '';
    content.value = '';
    achievements.value = '';
    resource.value = '';
    problem.value = '';

  }
}
