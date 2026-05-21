export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      admin_users: {
        Row: {
          created_at: string | null
          email: string
          id: string
          name: string | null
          password_hash: string
          role: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          name?: string | null
          password_hash: string
          role?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          name?: string | null
          password_hash?: string
          role?: string | null
        }
        Relationships: []
      }
      BIFAG_blog_posts: {
        Row: {
          author_image_url: string | null
          author_name: string
          category: string
          content_md: string
          created_at: string
          display_order: number
          excerpt: string
          hero_image_alt: string | null
          hero_image_url: string | null
          id: string
          og_image_url: string | null
          published_at: string | null
          reading_time_minutes: number | null
          seo_description: string | null
          seo_title: string | null
          slug: string
          status: Database["public"]["Enums"]["bifag_post_status"]
          tags: string[]
          title: string
          updated_at: string
        }
        Insert: {
          author_image_url?: string | null
          author_name?: string
          category: string
          content_md: string
          created_at?: string
          display_order?: number
          excerpt: string
          hero_image_alt?: string | null
          hero_image_url?: string | null
          id?: string
          og_image_url?: string | null
          published_at?: string | null
          reading_time_minutes?: number | null
          seo_description?: string | null
          seo_title?: string | null
          slug: string
          status?: Database["public"]["Enums"]["bifag_post_status"]
          tags?: string[]
          title: string
          updated_at?: string
        }
        Update: {
          author_image_url?: string | null
          author_name?: string
          category?: string
          content_md?: string
          created_at?: string
          display_order?: number
          excerpt?: string
          hero_image_alt?: string | null
          hero_image_url?: string | null
          id?: string
          og_image_url?: string | null
          published_at?: string | null
          reading_time_minutes?: number | null
          seo_description?: string | null
          seo_title?: string | null
          slug?: string
          status?: Database["public"]["Enums"]["bifag_post_status"]
          tags?: string[]
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      BIFAG_faqs: {
        Row: {
          answer_md: string
          category: Database["public"]["Enums"]["bifag_faq_category"]
          created_at: string
          display_order: number
          id: string
          is_published: boolean
          question: string
          show_on_haengekrane: boolean
          show_on_homepage: boolean
          show_on_portalkrane: boolean
          updated_at: string
        }
        Insert: {
          answer_md: string
          category: Database["public"]["Enums"]["bifag_faq_category"]
          created_at?: string
          display_order?: number
          id?: string
          is_published?: boolean
          question: string
          show_on_haengekrane?: boolean
          show_on_homepage?: boolean
          show_on_portalkrane?: boolean
          updated_at?: string
        }
        Update: {
          answer_md?: string
          category?: Database["public"]["Enums"]["bifag_faq_category"]
          created_at?: string
          display_order?: number
          id?: string
          is_published?: boolean
          question?: string
          show_on_haengekrane?: boolean
          show_on_homepage?: boolean
          show_on_portalkrane?: boolean
          updated_at?: string
        }
        Relationships: []
      }
      BIFAG_inquiries: {
        Row: {
          anliegen: string
          anzahl_hebezeuge: string | null
          attachments: Json
          bemerkungen: string | null
          budget: string | null
          created_at: string
          email: string | null
          firma: string | null
          halle_breite: string | null
          halle_hoehe: string | null
          halle_laenge: string | null
          id: string
          kontaktweg: string | null
          name: string
          plz_ort: string | null
          source_page: string | null
          status: string
          system_typ: string | null
          telefon: string | null
          traegerart: string | null
          tragfaehigkeit: string | null
          updated_at: string
          wunschtermin: string | null
          zeithorizont: string | null
        }
        Insert: {
          anliegen: string
          anzahl_hebezeuge?: string | null
          attachments?: Json
          bemerkungen?: string | null
          budget?: string | null
          created_at?: string
          email?: string | null
          firma?: string | null
          halle_breite?: string | null
          halle_hoehe?: string | null
          halle_laenge?: string | null
          id?: string
          kontaktweg?: string | null
          name: string
          plz_ort?: string | null
          source_page?: string | null
          status?: string
          system_typ?: string | null
          telefon?: string | null
          traegerart?: string | null
          tragfaehigkeit?: string | null
          updated_at?: string
          wunschtermin?: string | null
          zeithorizont?: string | null
        }
        Update: {
          anliegen?: string
          anzahl_hebezeuge?: string | null
          attachments?: Json
          bemerkungen?: string | null
          budget?: string | null
          created_at?: string
          email?: string | null
          firma?: string | null
          halle_breite?: string | null
          halle_hoehe?: string | null
          halle_laenge?: string | null
          id?: string
          kontaktweg?: string | null
          name?: string
          plz_ort?: string | null
          source_page?: string | null
          status?: string
          system_typ?: string | null
          telefon?: string | null
          traegerart?: string | null
          tragfaehigkeit?: string | null
          updated_at?: string
          wunschtermin?: string | null
          zeithorizont?: string | null
        }
        Relationships: []
      }
      BIFAG_newsletter_subscribers: {
        Row: {
          confirm_token: string
          confirmed_at: string | null
          created_at: string
          email: string
          id: string
          name: string | null
          source_page: string | null
          status: string
          unsubscribe_token: string
          unsubscribed_at: string | null
        }
        Insert: {
          confirm_token?: string
          confirmed_at?: string | null
          created_at?: string
          email: string
          id?: string
          name?: string | null
          source_page?: string | null
          status?: string
          unsubscribe_token?: string
          unsubscribed_at?: string | null
        }
        Update: {
          confirm_token?: string
          confirmed_at?: string | null
          created_at?: string
          email?: string
          id?: string
          name?: string | null
          source_page?: string | null
          status?: string
          unsubscribe_token?: string
          unsubscribed_at?: string | null
        }
        Relationships: []
      }
      BIFAG_references_cases: {
        Row: {
          branch: Database["public"]["Enums"]["bifag_reference_branch"]
          challenge_md: string
          created_at: string
          customer_location: string | null
          customer_name: string
          customer_quote: string | null
          customer_quote_author: string | null
          display_order: number
          gallery_images: Json
          hero_image_alt: string | null
          hero_image_url: string
          id: string
          is_featured: boolean
          is_published: boolean
          og_image_url: string | null
          seo_description: string | null
          seo_title: string | null
          slug: string
          solution_md: string
          spec_anlagentyp: string
          spec_extra: Json
          spec_kranbahnlaenge: string | null
          spec_spannweite: string | null
          spec_tragfaehigkeit: string
          subtitle: string | null
          system_type: Database["public"]["Enums"]["bifag_reference_system"]
          title: string
          updated_at: string
        }
        Insert: {
          branch: Database["public"]["Enums"]["bifag_reference_branch"]
          challenge_md: string
          created_at?: string
          customer_location?: string | null
          customer_name: string
          customer_quote?: string | null
          customer_quote_author?: string | null
          display_order?: number
          gallery_images?: Json
          hero_image_alt?: string | null
          hero_image_url: string
          id?: string
          is_featured?: boolean
          is_published?: boolean
          og_image_url?: string | null
          seo_description?: string | null
          seo_title?: string | null
          slug: string
          solution_md: string
          spec_anlagentyp: string
          spec_extra?: Json
          spec_kranbahnlaenge?: string | null
          spec_spannweite?: string | null
          spec_tragfaehigkeit: string
          subtitle?: string | null
          system_type: Database["public"]["Enums"]["bifag_reference_system"]
          title: string
          updated_at?: string
        }
        Update: {
          branch?: Database["public"]["Enums"]["bifag_reference_branch"]
          challenge_md?: string
          created_at?: string
          customer_location?: string | null
          customer_name?: string
          customer_quote?: string | null
          customer_quote_author?: string | null
          display_order?: number
          gallery_images?: Json
          hero_image_alt?: string | null
          hero_image_url?: string
          id?: string
          is_featured?: boolean
          is_published?: boolean
          og_image_url?: string | null
          seo_description?: string | null
          seo_title?: string | null
          slug?: string
          solution_md?: string
          spec_anlagentyp?: string
          spec_extra?: Json
          spec_kranbahnlaenge?: string | null
          spec_spannweite?: string | null
          spec_tragfaehigkeit?: string
          subtitle?: string | null
          system_type?: Database["public"]["Enums"]["bifag_reference_system"]
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      BIFAG_user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["bifag_app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["bifag_app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["bifag_app_role"]
          user_id?: string
        }
        Relationships: []
      }
      BT_drinks: {
        Row: {
          active: boolean
          category: string | null
          created_at: string
          description: string | null
          id: string
          is_featured: boolean
          name: string
          price: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          active?: boolean
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_featured?: boolean
          name: string
          price: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          active?: boolean
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_featured?: boolean
          name?: string
          price?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      BT_events: {
        Row: {
          accent: string
          active: boolean
          created_at: string
          date_iso: string | null
          date_label: string
          description: string | null
          id: string
          image_url: string | null
          is_big: boolean
          sort_order: number
          title: string
          updated_at: string
        }
        Insert: {
          accent?: string
          active?: boolean
          created_at?: string
          date_iso?: string | null
          date_label: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_big?: boolean
          sort_order?: number
          title: string
          updated_at?: string
        }
        Update: {
          accent?: string
          active?: boolean
          created_at?: string
          date_iso?: string | null
          date_label?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_big?: boolean
          sort_order?: number
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      BT_gallery: {
        Row: {
          active: boolean
          alt: string | null
          created_at: string
          height: string
          id: string
          image_url: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          active?: boolean
          alt?: string | null
          created_at?: string
          height?: string
          id?: string
          image_url: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          active?: boolean
          alt?: string | null
          created_at?: string
          height?: string
          id?: string
          image_url?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      BT_opening_hours: {
        Row: {
          close_next_day: boolean
          close_time: string | null
          closed: boolean
          day_of_week: number
          id: string
          open_time: string | null
          updated_at: string
        }
        Insert: {
          close_next_day?: boolean
          close_time?: string | null
          closed?: boolean
          day_of_week: number
          id?: string
          open_time?: string | null
          updated_at?: string
        }
        Update: {
          close_next_day?: boolean
          close_time?: string | null
          closed?: boolean
          day_of_week?: number
          id?: string
          open_time?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      BT_popup: {
        Row: {
          active: boolean
          content: string | null
          created_at: string
          cta_label: string | null
          cta_url: string | null
          ends_at: string | null
          id: string
          image_url: string | null
          starts_at: string | null
          title: string
          updated_at: string
        }
        Insert: {
          active?: boolean
          content?: string | null
          created_at?: string
          cta_label?: string | null
          cta_url?: string | null
          ends_at?: string | null
          id?: string
          image_url?: string | null
          starts_at?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          active?: boolean
          content?: string | null
          created_at?: string
          cta_label?: string | null
          cta_url?: string | null
          ends_at?: string | null
          id?: string
          image_url?: string | null
          starts_at?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      BT_snacks: {
        Row: {
          active: boolean
          allergens: string[]
          category: string | null
          created_at: string
          description: string | null
          id: string
          is_featured: boolean
          name: string
          price: string
          price_with_fries: string | null
          sort_order: number
          updated_at: string
        }
        Insert: {
          active?: boolean
          allergens?: string[]
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_featured?: boolean
          name: string
          price: string
          price_with_fries?: string | null
          sort_order?: number
          updated_at?: string
        }
        Update: {
          active?: boolean
          allergens?: string[]
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_featured?: boolean
          name?: string
          price?: string
          price_with_fries?: string | null
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      BT_user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["bt_app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["bt_app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["bt_app_role"]
          user_id?: string
        }
        Relationships: []
      }
      contact_submissions: {
        Row: {
          company: string | null
          created_at: string | null
          email: string
          id: string
          message: string
          name: string
          read: boolean | null
        }
        Insert: {
          company?: string | null
          created_at?: string | null
          email: string
          id?: string
          message: string
          name: string
          read?: boolean | null
        }
        Update: {
          company?: string | null
          created_at?: string | null
          email?: string
          id?: string
          message?: string
          name?: string
          read?: boolean | null
        }
        Relationships: []
      }
      documents: {
        Row: {
          active: boolean | null
          category: string
          created_at: string | null
          file_name: string | null
          file_size: number | null
          file_url: string
          id: string
          sort_order: number | null
          title: string
          year: number | null
        }
        Insert: {
          active?: boolean | null
          category: string
          created_at?: string | null
          file_name?: string | null
          file_size?: number | null
          file_url: string
          id?: string
          sort_order?: number | null
          title: string
          year?: number | null
        }
        Update: {
          active?: boolean | null
          category?: string
          created_at?: string | null
          file_name?: string | null
          file_size?: number | null
          file_url?: string
          id?: string
          sort_order?: number | null
          title?: string
          year?: number | null
        }
        Relationships: []
      }
      gallery_images: {
        Row: {
          category: string
          created_at: string | null
          description: string | null
          event_date: string | null
          event_name: string | null
          id: string
          url: string
        }
        Insert: {
          category?: string
          created_at?: string | null
          description?: string | null
          event_date?: string | null
          event_name?: string | null
          id?: string
          url: string
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string | null
          event_date?: string | null
          event_name?: string | null
          id?: string
          url?: string
        }
        Relationships: []
      }
      memberships: {
        Row: {
          active: boolean | null
          created_at: string | null
          id: string
          logo_url: string | null
          name: string
          sort_order: number | null
          website_url: string | null
        }
        Insert: {
          active?: boolean | null
          created_at?: string | null
          id?: string
          logo_url?: string | null
          name: string
          sort_order?: number | null
          website_url?: string | null
        }
        Update: {
          active?: boolean | null
          created_at?: string | null
          id?: string
          logo_url?: string | null
          name?: string
          sort_order?: number | null
          website_url?: string | null
        }
        Relationships: []
      }
      MKW_reference_images: {
        Row: {
          caption: string | null
          created_at: string
          id: string
          image_url: string
          reference_id: string
          sort_order: number
        }
        Insert: {
          caption?: string | null
          created_at?: string
          id?: string
          image_url: string
          reference_id: string
          sort_order?: number
        }
        Update: {
          caption?: string | null
          created_at?: string
          id?: string
          image_url?: string
          reference_id?: string
          sort_order?: number
        }
        Relationships: [
          {
            foreignKeyName: "MKW_reference_images_reference_id_fkey"
            columns: ["reference_id"]
            isOneToOne: false
            referencedRelation: "MKW_references"
            referencedColumns: ["id"]
          },
        ]
      }
      MKW_references: {
        Row: {
          category: string
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          location: string | null
          sort_order: number
          status: string
          title: string
          updated_at: string
          year: string | null
        }
        Insert: {
          category: string
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          location?: string | null
          sort_order?: number
          status?: string
          title: string
          updated_at?: string
          year?: string | null
        }
        Update: {
          category?: string
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          location?: string | null
          sort_order?: number
          status?: string
          title?: string
          updated_at?: string
          year?: string | null
        }
        Relationships: []
      }
      MKW_user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["mkw_app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["mkw_app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["mkw_app_role"]
          user_id?: string
        }
        Relationships: []
      }
      news_articles: {
        Row: {
          active: boolean | null
          category: string | null
          content: string | null
          created_at: string | null
          excerpt: string | null
          id: string
          image_url: string | null
          published_at: string | null
          slug: string
          title: string
        }
        Insert: {
          active?: boolean | null
          category?: string | null
          content?: string | null
          created_at?: string | null
          excerpt?: string | null
          id?: string
          image_url?: string | null
          published_at?: string | null
          slug: string
          title: string
        }
        Update: {
          active?: boolean | null
          category?: string | null
          content?: string | null
          created_at?: string | null
          excerpt?: string | null
          id?: string
          image_url?: string | null
          published_at?: string | null
          slug?: string
          title?: string
        }
        Relationships: []
      }
      newsletter_subscribers: {
        Row: {
          anrede: string
          email: string
          id: string
          nachname: string
          status: string | null
          subscribed_at: string | null
          vorname: string
        }
        Insert: {
          anrede: string
          email: string
          id?: string
          nachname: string
          status?: string | null
          subscribed_at?: string | null
          vorname: string
        }
        Update: {
          anrede?: string
          email?: string
          id?: string
          nachname?: string
          status?: string | null
          subscribed_at?: string | null
          vorname?: string
        }
        Relationships: []
      }
      properties: {
        Row: {
          active: boolean | null
          canton: string | null
          created_at: string | null
          description: string | null
          details: string | null
          id: string
          image_url: string | null
          location: string
          name: string
          sort_order: number | null
          status: string | null
        }
        Insert: {
          active?: boolean | null
          canton?: string | null
          created_at?: string | null
          description?: string | null
          details?: string | null
          id?: string
          image_url?: string | null
          location: string
          name: string
          sort_order?: number | null
          status?: string | null
        }
        Update: {
          active?: boolean | null
          canton?: string | null
          created_at?: string | null
          description?: string | null
          details?: string | null
          id?: string
          image_url?: string | null
          location?: string
          name?: string
          sort_order?: number | null
          status?: string | null
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          id: string
          key: string
          updated_at: string | null
          value: string | null
        }
        Insert: {
          id?: string
          key: string
          updated_at?: string | null
          value?: string | null
        }
        Update: {
          id?: string
          key?: string
          updated_at?: string | null
          value?: string | null
        }
        Relationships: []
      }
      smaak_contact_submissions: {
        Row: {
          company: string | null
          created_at: string
          email: string
          id: string
          message: string
          name: string
          read: boolean
        }
        Insert: {
          company?: string | null
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          read?: boolean
        }
        Update: {
          company?: string | null
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          read?: boolean
        }
        Relationships: []
      }
      team_members: {
        Row: {
          active: boolean | null
          bio: string | null
          category: string
          created_at: string | null
          id: string
          image_url: string | null
          name: string
          role: string
          sort_order: number | null
        }
        Insert: {
          active?: boolean | null
          bio?: string | null
          category: string
          created_at?: string | null
          id?: string
          image_url?: string | null
          name: string
          role: string
          sort_order?: number | null
        }
        Update: {
          active?: boolean | null
          bio?: string | null
          category?: string
          created_at?: string | null
          id?: string
          image_url?: string | null
          name?: string
          role?: string
          sort_order?: number | null
        }
        Relationships: []
      }
      th_contact_messages: {
        Row: {
          anrede: string | null
          betreff: string
          created_at: string | null
          email: string
          email_status: string | null
          firma: string | null
          id: string
          nachname: string
          nachricht: string
          telefon: string | null
          vorname: string
        }
        Insert: {
          anrede?: string | null
          betreff: string
          created_at?: string | null
          email: string
          email_status?: string | null
          firma?: string | null
          id?: string
          nachname: string
          nachricht: string
          telefon?: string | null
          vorname: string
        }
        Update: {
          anrede?: string | null
          betreff?: string
          created_at?: string | null
          email?: string
          email_status?: string | null
          firma?: string | null
          id?: string
          nachname?: string
          nachricht?: string
          telefon?: string | null
          vorname?: string
        }
        Relationships: []
      }
      th_documents: {
        Row: {
          category: string
          created_at: string
          id: string
          language: string
          name: string
          sort_order: number | null
          updated_at: string
          url: string
        }
        Insert: {
          category: string
          created_at?: string
          id?: string
          language?: string
          name: string
          sort_order?: number | null
          updated_at?: string
          url: string
        }
        Update: {
          category?: string
          created_at?: string
          id?: string
          language?: string
          name?: string
          sort_order?: number | null
          updated_at?: string
          url?: string
        }
        Relationships: []
      }
      th_news: {
        Row: {
          content: string | null
          created_at: string
          document_url: string | null
          id: string
          image_url: string | null
          is_published: boolean | null
          published_at: string | null
          subtitle: string | null
          title: string
          updated_at: string
        }
        Insert: {
          content?: string | null
          created_at?: string
          document_url?: string | null
          id?: string
          image_url?: string | null
          is_published?: boolean | null
          published_at?: string | null
          subtitle?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          content?: string | null
          created_at?: string
          document_url?: string | null
          id?: string
          image_url?: string | null
          is_published?: boolean | null
          published_at?: string | null
          subtitle?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      th_newsletter_subscribers: {
        Row: {
          anrede: string | null
          email: string
          id: string
          is_active: boolean | null
          nachname: string | null
          subscribed_at: string
          vorname: string | null
        }
        Insert: {
          anrede?: string | null
          email: string
          id?: string
          is_active?: boolean | null
          nachname?: string | null
          subscribed_at?: string
          vorname?: string | null
        }
        Update: {
          anrede?: string | null
          email?: string
          id?: string
          is_active?: boolean | null
          nachname?: string | null
          subscribed_at?: string
          vorname?: string | null
        }
        Relationships: []
      }
      th_properties: {
        Row: {
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          location: string
          name: string
          num_apartments: number | null
          num_commercial: number | null
          sort_order: number | null
          updated_at: string
          year_built: number | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          location: string
          name: string
          num_apartments?: number | null
          num_commercial?: number | null
          sort_order?: number | null
          updated_at?: string
          year_built?: number | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          location?: string
          name?: string
          num_apartments?: number | null
          num_commercial?: number | null
          sort_order?: number | null
          updated_at?: string
          year_built?: number | null
        }
        Relationships: []
      }
      th_team_members: {
        Row: {
          bio: string | null
          created_at: string
          email: string | null
          id: string
          name: string
          phone: string | null
          photo_url: string | null
          role: string
          sort_order: number | null
          type: string
          updated_at: string
        }
        Insert: {
          bio?: string | null
          created_at?: string
          email?: string | null
          id?: string
          name: string
          phone?: string | null
          photo_url?: string | null
          role: string
          sort_order?: number | null
          type?: string
          updated_at?: string
        }
        Update: {
          bio?: string | null
          created_at?: string
          email?: string | null
          id?: string
          name?: string
          phone?: string | null
          photo_url?: string | null
          role?: string
          sort_order?: number | null
          type?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      "Wald-Hof_orders": {
        Row: {
          address: string | null
          company: string | null
          created_at: string
          email: string
          id: string
          lieferart: string
          liefertermin: string
          message: string | null
          name: string
          ort: string | null
          phone: string
          plz: string | null
          qm: number
          sorte: string
          status: string
          updated_at: string
        }
        Insert: {
          address?: string | null
          company?: string | null
          created_at?: string
          email: string
          id?: string
          lieferart: string
          liefertermin: string
          message?: string | null
          name: string
          ort?: string | null
          phone: string
          plz?: string | null
          qm: number
          sorte: string
          status?: string
          updated_at?: string
        }
        Update: {
          address?: string | null
          company?: string | null
          created_at?: string
          email?: string
          id?: string
          lieferart?: string
          liefertermin?: string
          message?: string | null
          name?: string
          ort?: string | null
          phone?: string
          plz?: string | null
          qm?: number
          sorte?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_bifag_role: {
        Args: {
          _role: Database["public"]["Enums"]["bifag_app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      has_bt_role: {
        Args: {
          _role: Database["public"]["Enums"]["bt_app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      has_mkw_role: {
        Args: {
          _role: Database["public"]["Enums"]["mkw_app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
      bifag_app_role: "admin" | "editor"
      bifag_faq_category:
        | "allgemein"
        | "haengekrane"
        | "portalkrane"
        | "service"
        | "preis"
      bifag_post_status: "draft" | "published" | "archived"
      bifag_reference_branch:
        | "produktion"
        | "verarbeitung"
        | "fertigung"
        | "industrie"
        | "logistik"
        | "mobilitaet"
        | "holzbau"
        | "metallbau"
      bifag_reference_system: "haengekran" | "portalkran" | "sonderkonstruktion"
      bt_app_role: "admin" | "editor"
      mkw_app_role: "admin" | "editor"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
      bifag_app_role: ["admin", "editor"],
      bifag_faq_category: [
        "allgemein",
        "haengekrane",
        "portalkrane",
        "service",
        "preis",
      ],
      bifag_post_status: ["draft", "published", "archived"],
      bifag_reference_branch: [
        "produktion",
        "verarbeitung",
        "fertigung",
        "industrie",
        "logistik",
        "mobilitaet",
        "holzbau",
        "metallbau",
      ],
      bifag_reference_system: [
        "haengekran",
        "portalkran",
        "sonderkonstruktion",
      ],
      bt_app_role: ["admin", "editor"],
      mkw_app_role: ["admin", "editor"],
    },
  },
} as const
