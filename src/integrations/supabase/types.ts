export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      favorites: {
        Row: {
          created_at: string | null
          id: string
          model_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          model_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          model_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "favorites_model_id_fkey"
            columns: ["model_id"]
            isOneToOne: false
            referencedRelation: "models"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "favorites_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "creators"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "favorites_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      model_availability: {
        Row: {
          available: boolean
          day: string
          id: string
          model_id: string | null
        }
        Insert: {
          available?: boolean
          day: string
          id?: string
          model_id?: string | null
        }
        Update: {
          available?: boolean
          day?: string
          id?: string
          model_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "model_availability_model_id_fkey"
            columns: ["model_id"]
            isOneToOne: false
            referencedRelation: "models"
            referencedColumns: ["id"]
          },
        ]
      }
      model_posts: {
        Row: {
          comments: number
          content: string | null
          created_at: string | null
          id: string
          is_premium: boolean
          likes: number
          media_type: string
          media_url: string
          model_id: string | null
        }
        Insert: {
          comments?: number
          content?: string | null
          created_at?: string | null
          id?: string
          is_premium?: boolean
          likes?: number
          media_type: string
          media_url: string
          model_id?: string | null
        }
        Update: {
          comments?: number
          content?: string | null
          created_at?: string | null
          id?: string
          is_premium?: boolean
          likes?: number
          media_type?: string
          media_url?: string
          model_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "model_posts_model_id_fkey"
            columns: ["model_id"]
            isOneToOne: false
            referencedRelation: "models"
            referencedColumns: ["id"]
          },
        ]
      }
      model_tags: {
        Row: {
          id: string
          model_id: string | null
          tag: string
        }
        Insert: {
          id?: string
          model_id?: string | null
          tag: string
        }
        Update: {
          id?: string
          model_id?: string | null
          tag?: string
        }
        Relationships: [
          {
            foreignKeyName: "model_tags_model_id_fkey"
            columns: ["model_id"]
            isOneToOne: false
            referencedRelation: "models"
            referencedColumns: ["id"]
          },
        ]
      }
      models: {
        Row: {
          age: number
          created_at: string | null
          distance: string | null
          fallback_image_url: string | null
          featured: boolean
          id: string
          name: string
          price: number
          profile_image_url: string | null
          rating: number
          review_count: number
          updated_at: string | null
          user_id: string | null
          verified: boolean
        }
        Insert: {
          age: number
          created_at?: string | null
          distance?: string | null
          fallback_image_url?: string | null
          featured?: boolean
          id?: string
          name: string
          price: number
          profile_image_url?: string | null
          rating?: number
          review_count?: number
          updated_at?: string | null
          user_id?: string | null
          verified?: boolean
        }
        Update: {
          age?: number
          created_at?: string | null
          distance?: string | null
          fallback_image_url?: string | null
          featured?: boolean
          id?: string
          name?: string
          price?: number
          profile_image_url?: string | null
          rating?: number
          review_count?: number
          updated_at?: string | null
          user_id?: string | null
          verified?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "models_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "creators"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "models_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          applied_at: string | null
          approved_at: string | null
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          creator_status: Database["public"]["Enums"]["creator_status"]
          gender: string | null
          id: string
          is_creator: boolean | null
          updated_at: string | null
          username: string | null
        }
        Insert: {
          applied_at?: string | null
          approved_at?: string | null
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          creator_status?: Database["public"]["Enums"]["creator_status"]
          gender?: string | null
          id: string
          is_creator?: boolean | null
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          applied_at?: string | null
          approved_at?: string | null
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          creator_status?: Database["public"]["Enums"]["creator_status"]
          gender?: string | null
          id?: string
          is_creator?: boolean | null
          updated_at?: string | null
          username?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      creators: {
        Row: {
          applied_at: string | null
          approved_at: string | null
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          creator_status: Database["public"]["Enums"]["creator_status"] | null
          gender: string | null
          id: string | null
          is_creator: boolean | null
          updated_at: string | null
          username: string | null
        }
        Insert: {
          applied_at?: string | null
          approved_at?: string | null
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          creator_status?: Database["public"]["Enums"]["creator_status"] | null
          gender?: string | null
          id?: string | null
          is_creator?: boolean | null
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          applied_at?: string | null
          approved_at?: string | null
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          creator_status?: Database["public"]["Enums"]["creator_status"] | null
          gender?: string | null
          id?: string | null
          is_creator?: boolean | null
          updated_at?: string | null
          username?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      creator_status: "not_applied" | "pending" | "approved" | "rejected"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      creator_status: ["not_applied", "pending", "approved", "rejected"],
    },
  },
} as const
