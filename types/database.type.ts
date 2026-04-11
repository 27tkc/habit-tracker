import { Models } from "react-native-appwrite";

export interface Habit extends Models.Document {
  $id: string;
  user_id: string;
  title: string;
  description: string;
  frequency: string;
  created_at: string;
  last_completed: string;
  streak_count: number;
}

export interface HabitCompletion extends Models.Document {
  $id: string;
  habit_id: string;
  user_id: string;
  completed_at: string;
}
