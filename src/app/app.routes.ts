import { Routes } from '@angular/router';
import { CharacterFormComponent } from './components/character-form/character-form.component';
import { CharacterSheetComponent } from './components/character-sheet/character-sheet.component';
import { CharacterListComponent } from './components/character-list/character-list.component';

export const routes: Routes = [
  { path: '', redirectTo: 'salvos', pathMatch: 'full' },
  { path: 'salvos', component: CharacterListComponent },
  { path: 'character/:id', component: CharacterFormComponent },
  { path: 'novo', component: CharacterFormComponent },
];
