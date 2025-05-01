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
          updated_at: string | null
        }
        Insert: {
          config_key: string
          config_value: string
          created_at?: string | null
          id?: string
          updated_at?: string | null
        }
        Update: {
          config_key?: string
          config_value?: string
          created_at?: string | null
          id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      assets: {
        Row: {
          assigned_to: string | null
          capacity: string | null
          coordinates: string | null
          created_at: string | null
          id: string
          image_src: string | null
          last_maintenance: string | null
          location: string | null
          model: string
          serial_number: string | null
          status: string
          temperature_range: string | null
          updated_at: string | null
        }
        Insert: {
          assigned_to?: string | null
          capacity?: string | null
          coordinates?: string | null
          created_at?: string | null
          id: string
          image_src?: string | null
          last_maintenance?: string | null
          location?: string | null
          model: string
          serial_number?: string | null
          status?: string
          temperature_range?: string | null
          updated_at?: string | null
        }
        Update: {
          assigned_to?: string | null
          capacity?: string | null
          coordinates?: string | null
          created_at?: string | null
          id?: string
          image_src?: string | null
          last_maintenance?: string | null
          location?: string | null
          model?: string
          serial_number?: string | null
          status?: string
          temperature_range?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      clientes: {
        Row: {
          created_at: string | null
          direccion: string | null
          id: string
          nombre: string
          rfc: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          direccion?: string | null
          id?: string
          nombre: string
          rfc: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          direccion?: string | null
          id?: string
          nombre?: string
          rfc?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      clients: {
        Row: {
          conserver: string | null
          created_at: string | null
          email: string
          id: string | null
          name: string
        }
        Insert: {
          conserver?: string | null
          created_at?: string | null
          email: string
          id?: string | null
          name: string
        }
        Update: {
          conserver?: string | null
          created_at?: string | null
          email?: string
          id?: string | null
          name?: string
        }
        Relationships: []
      }
      clients_extended: {
        Row: {
          active_credit: number | null
          address: string | null
          assets_assigned: number | null
          channel_type: string | null
          conserver_productivity: number | null
          contact_person: string | null
          coordinates: string | null
          created_at: string | null
          created_by: string | null
          email: string | null
          id: string
          image_src: string | null
          max_credit: number | null
          name: string
          phone: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          active_credit?: number | null
          address?: string | null
          assets_assigned?: number | null
          channel_type?: string | null
          conserver_productivity?: number | null
          contact_person?: string | null
          coordinates?: string | null
          created_at?: string | null
          created_by?: string | null
          email?: string | null
          id: string
          image_src?: string | null
          max_credit?: number | null
          name: string
          phone?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          active_credit?: number | null
          address?: string | null
          assets_assigned?: number | null
          channel_type?: string | null
          conserver_productivity?: number | null
          contact_person?: string | null
          coordinates?: string | null
          created_at?: string | null
          created_by?: string | null
          email?: string | null
          id?: string
          image_src?: string | null
          max_credit?: number | null
          name?: string
          phone?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      conservadores: {
        Row: {
          capacidad: string | null
          cliente_id: string | null
          estado: string
          estado_conservador: string
          fecha_registro: string | null
          id: string
          modelo: string
          notas: string | null
          numero_serie: string
          ubicacion: string | null
        }
        Insert: {
          capacidad?: string | null
          cliente_id?: string | null
          estado?: string
          estado_conservador?: string
          fecha_registro?: string | null
          id?: string
          modelo: string
          notas?: string | null
          numero_serie: string
          ubicacion?: string | null
        }
        Update: {
          capacidad?: string | null
          cliente_id?: string | null
          estado?: string
          estado_conservador?: string
          fecha_registro?: string | null
          id?: string
          modelo?: string
          notas?: string | null
          numero_serie?: string
          ubicacion?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "conservadores_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          },
        ]
      }
      detalles_orden: {
        Row: {
          cantidad: number
          created_at: string | null
          descripcion: string
          id: string
          orden_id: string | null
          precio_unitario: number
          subtotal: number
          tipo: string
        }
        Insert: {
          cantidad?: number
          created_at?: string | null
          descripcion: string
          id?: string
          orden_id?: string | null
          precio_unitario?: number
          subtotal?: number
          tipo: string
        }
        Update: {
          cantidad?: number
          created_at?: string | null
          descripcion?: string
          id?: string
          orden_id?: string | null
          precio_unitario?: number
          subtotal?: number
          tipo?: string
        }
        Relationships: [
          {
            foreignKeyName: "detalles_orden_orden_id_fkey"
            columns: ["orden_id"]
            isOneToOne: false
            referencedRelation: "ordenes_servicio"
            referencedColumns: ["id"]
          },
        ]
      }
      inventory_items: {
        Row: {
          category: string
          created_at: string | null
          id: number
          location: string | null
          min_quantity: number
          name: string
          part_number: string
          quantity: number
          unit_price: number
          updated_at: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          id?: number
          location?: string | null
          min_quantity?: number
          name: string
          part_number: string
          quantity?: number
          unit_price?: number
          updated_at?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          id?: number
          location?: string | null
          min_quantity?: number
          name?: string
          part_number?: string
          quantity?: number
          unit_price?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      inventory_movements: {
        Row: {
          created_at: string | null
          created_by: string | null
          id: number
          item_id: number | null
          movement_type: string
          new_quantity: number
          notes: string | null
          previous_quantity: number
          quantity: number
          reference_id: string | null
          reference_type: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          id?: number
          item_id?: number | null
          movement_type: string
          new_quantity: number
          notes?: string | null
          previous_quantity: number
          quantity: number
          reference_id?: string | null
          reference_type?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          id?: number
          item_id?: number | null
          movement_type?: string
          new_quantity?: number
          notes?: string | null
          previous_quantity?: number
          quantity?: number
          reference_id?: string | null
          reference_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "inventory_movements_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "inventory_items"
            referencedColumns: ["id"]
          },
        ]
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
      ordenes_servicio: {
        Row: {
          cliente_id: string | null
          conservador_id: string | null
          costo_reparacion: number | null
          created_at: string | null
          diagnostico: string | null
          estado: string
          fecha_entrega_estimada: string | null
          fecha_entrega_real: string | null
          fecha_recepcion: string | null
          id: string
          numero_orden: string
          problema_reportado: string | null
          solucion: string | null
          tipo_servicio: string
          updated_at: string | null
        }
        Insert: {
          cliente_id?: string | null
          conservador_id?: string | null
          costo_reparacion?: number | null
          created_at?: string | null
          diagnostico?: string | null
          estado?: string
          fecha_entrega_estimada?: string | null
          fecha_entrega_real?: string | null
          fecha_recepcion?: string | null
          id?: string
          numero_orden: string
          problema_reportado?: string | null
          solucion?: string | null
          tipo_servicio: string
          updated_at?: string | null
        }
        Update: {
          cliente_id?: string | null
          conservador_id?: string | null
          costo_reparacion?: number | null
          created_at?: string | null
          diagnostico?: string | null
          estado?: string
          fecha_entrega_estimada?: string | null
          fecha_entrega_real?: string | null
          fecha_recepcion?: string | null
          id?: string
          numero_orden?: string
          problema_reportado?: string | null
          solucion?: string | null
          tipo_servicio?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ordenes_servicio_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ordenes_servicio_conservador_id_fkey"
            columns: ["conservador_id"]
            isOneToOne: false
            referencedRelation: "conservadores"
            referencedColumns: ["id"]
          },
        ]
      }
      repair_parts: {
        Row: {
          created_at: string | null
          id: number
          item_id: number | null
          quantity: number
          repair_id: number | null
          unit_price: number
        }
        Insert: {
          created_at?: string | null
          id?: number
          item_id?: number | null
          quantity: number
          repair_id?: number | null
          unit_price: number
        }
        Update: {
          created_at?: string | null
          id?: number
          item_id?: number | null
          quantity?: number
          repair_id?: number | null
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "repair_parts_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "inventory_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "repair_parts_repair_id_fkey"
            columns: ["repair_id"]
            isOneToOne: false
            referencedRelation: "repairs"
            referencedColumns: ["id"]
          },
        ]
      }
      repairs: {
        Row: {
          assigned_to: string | null
          brand: string | null
          completed_at: string | null
          created_at: string | null
          created_by: string | null
          customer_email: string | null
          customer_name: string
          customer_phone: string | null
          diagnosis: string | null
          equipment_type: string
          estimated_completion: string | null
          id: number
          model: string | null
          order_number: string
          problem_description: string
          serial_number: string | null
          status: string
          updated_at: string | null
        }
        Insert: {
          assigned_to?: string | null
          brand?: string | null
          completed_at?: string | null
          created_at?: string | null
          created_by?: string | null
          customer_email?: string | null
          customer_name: string
          customer_phone?: string | null
          diagnosis?: string | null
          equipment_type: string
          estimated_completion?: string | null
          id?: number
          model?: string | null
          order_number: string
          problem_description: string
          serial_number?: string | null
          status?: string
          updated_at?: string | null
        }
        Update: {
          assigned_to?: string | null
          brand?: string | null
          completed_at?: string | null
          created_at?: string | null
          created_by?: string | null
          customer_email?: string | null
          customer_name?: string
          customer_phone?: string | null
          diagnosis?: string | null
          equipment_type?: string
          estimated_completion?: string | null
          id?: number
          model?: string | null
          order_number?: string
          problem_description?: string
          serial_number?: string | null
          status?: string
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
