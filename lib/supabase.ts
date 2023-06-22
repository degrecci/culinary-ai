export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      recipes: {
        Row: {
          cook_time: number | null;
          created_at: string | null;
          description: string | null;
          difficulty_level: string | null;
          id: number;
          ingredients: Json | null;
          instructions: Json | null;
          prep_time: number | null;
          serves: number | null;
          tips_and_variations: string | null;
          title: string;
          total_time: number | null;
          user_id: string | null;
        };
        Insert: {
          cook_time?: number | null;
          created_at?: string | null;
          description?: string | null;
          difficulty_level?: string | null;
          id?: number;
          ingredients?: Json | null;
          instructions?: Json | null;
          prep_time?: number | null;
          serves?: number | null;
          tips_and_variations?: string | null;
          title: string;
          total_time?: number | null;
          user_id?: string | null;
        };
        Update: {
          cook_time?: number | null;
          created_at?: string | null;
          description?: string | null;
          difficulty_level?: string | null;
          id?: number;
          ingredients?: Json | null;
          instructions?: Json | null;
          prep_time?: number | null;
          serves?: number | null;
          tips_and_variations?: string | null;
          title?: string;
          total_time?: number | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "recipes_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
