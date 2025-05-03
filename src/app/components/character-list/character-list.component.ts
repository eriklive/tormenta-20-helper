import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export interface Character {
  id: string;
  name: string;
  race: string;
  class: string;
}

@Component({
  selector: 'app-character-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss'],
})
export class CharacterListComponent implements OnInit {
  characters: Character[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    const data = localStorage.getItem('characters');
    this.characters = data ? JSON.parse(data) : [];
  }

  goToCharacter(id: string) {
    this.router.navigate(['/character', id]);
  }
}
