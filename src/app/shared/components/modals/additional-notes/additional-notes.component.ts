import { Component, Input, OnInit } from '@angular/core';
import { AdditionalNotesRequest } from '@app/core/models';
import { CommonComponentService } from '@app/shared/services';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-additional-notes',
  templateUrl: './additional-notes.component.html',
  styleUrls: ['./additional-notes.component.scss']
})
export class AdditionalNotesComponent implements OnInit {
  @Input() additionalNotes: string = '';
  @Input() message: string = '';
  @Input() proformaId: number = 0;

  public onClose: Subject<boolean> = new Subject();

  confirmed: boolean = false;
  constructor(
    private commonComponentService: CommonComponentService
  ) { }

  ngOnInit(): void {
  }

  close(refresh: boolean = false) {
    this.onClose.next(refresh);
  }

  confirm(){
    this.confirmed = true;
  }

  submit(){
    const payload: AdditionalNotesRequest = {
      proformaId: this.proformaId,
      additionalNotes: this.additionalNotes,
    }
    this.commonComponentService.updateAdditionalNotes(payload).subscribe(res => {
      this.close(true);
    })
  }

}
