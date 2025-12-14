import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StudentService } from '../../services/student-service';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './students.html',
  styleUrl: './students.css',
})
export class Students {
  students = signal<any[]>([]);
  selectedStudent = signal<any>({
    id: 0,
    name: '',
    class: '',
    section: '',
  });

  constructor(private service: StudentService) {
    this.loadStudents();
  }

  loadStudents() {
    this.service.getStudents().subscribe(data => {
      this.students.set(data);
    });
  }

  saveStudent() {
    const s = this.selectedStudent();

    if (s.id === 0) {
      this.service.addStudent(s).subscribe(() => this.loadStudents());
    } else {
      this.service.updateStudent(s).subscribe(() => this.loadStudents());
    }

    this.resetForm();
  }

  editStudent(s: any) {
    this.selectedStudent.set({ ...s });
  }

  deleteStudent(id: number) {
    this.service.deleteStudent(id).subscribe(() => this.loadStudents());
  }

  resetForm() {
    this.selectedStudent.set({
      id: 0,
      name: '',
      class: '',
      section: '',
    });
  }
}
