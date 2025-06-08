import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {StudentModel} from '../../core/models/student.model';
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
students: StudentModel[] = [];
studentId!: number | null;
groupName!: string;
studentName!: string;

constructor(
  private apiService: ApiService,
  private router: ActivatedRoute,
  private cdr: ChangeDetectorRef
) {}

  ngOnInit(): void {
  this.groupId = Number(this.router.snapshot.paramMap.get('id'));

    this.router.paramMap.subscribe(params => {
      const groupId = Number(params.get('id'));
      this.apiService.getGroups().subscribe(groups => {
        groups.find(group => {
          if (group.id == groupId) {
            this.groupName = group.name;
          }
        })
      })
    })

  this.apiService.getStudentByGroup(this.groupId).subscribe(data => {
    this.students = data;
    this.cdr.detectChanges();
  })

  }

  protected readonly ApiService = ApiService;


deleteStudent() {
  this.groupId = Number(this.router.snapshot.paramMap.get('id'));

  this.apiService.deleteStudent(this.studentId).subscribe(data =>{
    this.apiService.getStudentByGroup(this.groupId).subscribe(student => {
      this.students = student;
      this.cdr.detectChanges();
    });
    this.cdr.detectChanges();
    this.studentId = null;

  });
}

addStudent() {
const newStudent = {
  name: this.studentName,
  groupId: this.groupId,
};

  this.apiService.addStudent(newStudent).subscribe(student => {
    newStudent.name = student.name;
    newStudent.groupId = student.groupId;
    console.log('Created Student', newStudent);

    this.students.push(newStudent);
    this.studentName = '';
    this.cdr.detectChanges();
  })
}

  protected readonly name = name;
}
