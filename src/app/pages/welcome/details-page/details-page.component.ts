import {Component, Input, OnInit} from '@angular/core';
import {WorkNote} from "../worknote/WorkNote";
import {WorknoteService} from "../worknote/worknote.service";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {Router} from "@angular/router";


@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.scss']
})
export class DetailsPageComponent implements OnInit {
  visible = false;
  @Input() detailNote: WorkNote = new WorkNote();
  date: any = new Date();


  onOk(result: Date | Date[] | null): void {
    console.log('onOk', result);
  }

  constructor(private workNoteService: WorknoteService,
              private nzNotificationService: NzNotificationService,
              private router: Router) {

  }


  ngOnInit(): void {

  }

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

  clear() {
    this.visible = false;
  }

  update() {
    this.detailNote.date = this.date.toLocaleString();
    this.workNoteService.updateWorkNote(this.detailNote).subscribe(data => {
      if (data.success) {
        this.nzNotificationService.success('更新成功!!', '');
      } else {
        this.nzNotificationService.error('更新失败!!', '');
      }
    })
  }

  toEdit() {
    this.router.navigate(["/welcome/editPage"], {queryParams: {"id": this.detailNote.id}});
  }
}
