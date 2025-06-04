import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Group} from '../../core/models/group.model';
import {Student} from '../../core/models/student.model';
import {ApiService} from '../../core/services/api.service';

@Component({
  selector: 'app-group-list',
  standalone: false,
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss']
})
export class GroupListComponent implements OnInit {

  groups: Group[] = [];

  constructor(private apiService: ApiService,private router: Router) {
  }


  ngOnInit(): void {
  this.apiService.getGroups().subscribe(data => {
    console.log('API: ',data);
    this.groups = data.map(g => ({...g, id: Number(g.id)}));
    console.log('Groups:', this.groups);
  });
  }

  goToGroup(groupId: number): void {
    this.router.navigate(['group', groupId]);
  }

}
