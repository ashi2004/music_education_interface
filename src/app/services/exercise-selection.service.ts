import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type ExerciseType = 'current' | 'relative';
export type RelativeMode = 'unison' | 'chord';

export interface ExerciseSelectionState {
  selectedExercise: ExerciseType;
  selectedMode: RelativeMode | null;
}

@Injectable({
  providedIn: 'root',
})
export class ExerciseSelectionService {
  private readonly selectionSubject = new BehaviorSubject<ExerciseSelectionState>({
    selectedExercise: 'current',
    selectedMode: null,
  });

  readonly selection$ = this.selectionSubject.asObservable();

  setSelection(selectedExercise: ExerciseType, selectedMode: RelativeMode | null): void {
    this.selectionSubject.next({ selectedExercise, selectedMode });
  }
}
