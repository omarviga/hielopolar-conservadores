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
      app_config: {
        Row: {
          config_key: string
          config_value: string
          created_at: string | null
          id: string
        }
        Insert: {
          config_key: string
          config_value: string
          created_at?: string | null
          id?: string
        }
        Update: {
          config_key?: string
          config_value?: string
          created_at?: string | null
          id?: string
        }
        Relationships: []
      }
      clients: {
        Row: {
          created_at: string | null
          email: string
          id: string | null
          name: string
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string | null
          name: string
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string | null
          name?: string
        }
        Relationships: []
      }
      maintenances: {
        Row: {
          asset: string
          client: string
          created_at: string | null
          date: string
          id: string
          notes: string | null
          status: string
          technician: string
          title: string
          type: string | null
          updated_at: string | null
        }
        Insert: {
          asset: string
          client: string
          created_at?: string | null
          date: string
          id?: string
          notes?: string | null
          status: string
          technician: string
          title: string
          type?: string | null
          updated_at?: string | null
        }
        Update: {
          asset?: string
          client?: string
          created_at?: string | null
          date?: string
          id?: string
          notes?: string | null
          status?: string
          technician?: string
          title?: string
          type?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      repairs: {
        Row: {
          actual_completion_date: string | null
          asset_id: string
          cost: number | null
          created_at: string | null
          description: string
          diagnosis: string | null
          estimated_completion: string | null
          id: string
          notes: string | null
          parts_used: string[] | null
          priority: string | null
          repair_number: string | null
          repair_type: string | null
          status: string
          technician: string | null
          updated_at: string | null
        }
        Insert: {
          actual_completion_date?: string | null
          asset_id: string
          cost?: number | null
          created_at?: string | null
          description: string
          diagnosis?: string | null
          estimated_completion?: string | null
          id?: string
          notes?: string | null
          parts_used?: string[] | null
          priority?: string | null
          repair_number?: string | null
          repair_type?: string | null
          status?: string
          technician?: string | null
          updated_at?: string | null
        }
        Update: {
          actual_completion_date?: string | null
          asset_id?: string
          cost?: number | null
          created_at?: string | null
          description?: string
          diagnosis?: string | null
          estimated_completion?: string | null
          id?: string
          notes?: string | null
          parts_used?: string[] | null
          priority?: string | null
          repair_number?: string | null
          repair_type?: string | null
          status?: string
          technician?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      settings: {
        Row: {
          id: number
          mapbox_token: string
        }
        Insert: {
          id?: number
          mapbox_token: string
        }
        Update: {
          id?: number
          mapbox_token?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const
