import { Lesson } from '../types';
import { LESSONS_PART1 } from './lessons1';
import { LESSONS_PART2 } from './lessons2';
import { LESSONS_PART3 } from './lessons3';
import { LESSONS_PART4 } from './lessons4';
import { LESSONS_PART5 } from './lessons5';
import { LESSONS_PART6 } from './lessons6';

export const LESSONS: Lesson[] = [
  ...LESSONS_PART1,
  ...LESSONS_PART2,
  ...LESSONS_PART3,
  ...LESSONS_PART4,
  ...LESSONS_PART5,
  ...LESSONS_PART6
];
