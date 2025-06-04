import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Student} from '../../core/models/student.model';
import {ApiService} from '../../core/services/api.service';
import {ChangeDetectorRef} from '@angular/core';

@Component({
  selector: 'app-group-detail',
  standalone: false,
  templateUrl: './group-detail.component.html',
  styleUrl: './group-detail.component.scss'
})
export class GroupDetailComponent {
groupId!: number;
students: Student[] = [];

constructor(
  private apiService: ApiService,
  private router: ActivatedRoute,
  private cdr: ChangeDetectorRef
) {}

  ngOnInit(): void {
  this.groupId = Number(this.router.snapshot.paramMap.get('id'));

  this.apiService.getStudentByGroup(this.groupId).subscribe(data => {
    this.students = data;
    this.cdr.detectChanges();
  })
  }
}
