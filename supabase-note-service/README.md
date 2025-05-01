# Supabase Notes Mini Project

## 🔧 Setup & Deployment

1. Create a new project in Supabase.
2. Enable the Edge Functions.
3. Copy `schema.sql` and run it in Supabase SQL Editor.
4. Deploy functions:

```bash
supabase functions deploy post_notes
supabase functions deploy get_notes
```

5. Set environment variables:
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`

---

## ❓ Design Decisions

- **Primary key**: `id` is `uuid` with default to `gen_random_uuid()` for uniqueness.
- **User Auth**: `user_id` linked to `auth.users`, with cascading delete.
- **Timestamps**: `created_at` auto-defaults to current timestamp.

---

## 📌 Curl Demo

### ➕ Create Note

```bash
curl -X POST https://<project>.functions.supabase.co/post_notes \
  -H "Authorization: Bearer <your_token>" \
  -H "Content-Type: application/json" \
  -d '{ "title": "My First Note", "content": "This is a test note." }'
```

#### Expected Response:

```json
{
  "data": [
    {
      "id": "uuid-here",
      "user_id": "user-uuid",
      "title": "My First Note",
      "content": "This is a test note.",
      "created_at": "2025-05-01T12:34:56Z"
    }
  ],
  "error": null
}
```

---

### 📄 Get Notes

```bash
curl -X GET https://<project>.functions.supabase.co/get_notes \
  -H "Authorization: Bearer <your_token>"
```

#### Expected Response:

```json
{
  "data": [
    {
      "id": "uuid-here",
      "user_id": "user-uuid",
      "title": "My First Note",
      "content": "This is a test note.",
      "created_at": "2025-05-01T12:34:56Z"
    }
  ],
  "error": null
}
```
