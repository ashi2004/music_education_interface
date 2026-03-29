import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { ExerciseType, RelativeMode } from 'src/app/services/exercise-selection.service';

@Component({
  selector: 'app-exercise-select-modal',
  templateUrl: './exercise-select-modal.component.html',
  styleUrls: ['./exercise-select-modal.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class ExerciseSelectModalComponent {
  selectedExercise: ExerciseType | null = null;
  selectedMode: RelativeMode | null = null;

  constructor(private modalController: ModalController) {}

  selectExercise(value: ExerciseType): void {
    this.selectedExercise = value;

    if (value === 'current') {
      this.selectedMode = null;
    }
  }

  selectMode(value: RelativeMode): void {
    this.selectedMode = value;
  }

  onExerciseChange(value: ExerciseType | null): void {
    if (value === 'current') {
      this.selectedMode = null;
    }
  }

  canContinue(): boolean {
    if (!this.selectedExercise) {
      return false;
    }

    if (this.selectedExercise === 'relative' && !this.selectedMode) {
      return false;
    }

    return true;
  }

  async cancel(): Promise<void> {
    await this.modalController.dismiss(undefined, 'cancel');
  }

  async confirmSelection(): Promise<void> {
    if (!this.selectedExercise) {
      return;
    }

    await this.modalController.dismiss(
      {
        selectedExercise: this.selectedExercise,
        selectedMode: this.selectedExercise === 'relative' ? this.selectedMode : null,
      },
      'confirm'
    );
  }
}
