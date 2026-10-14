import { z } from 'zod'

export const createLaundrySchema = z.object({
  nama_pelanggan: z.string().trim().min(1),
  berat_kg: z.number().positive(),
  status_selesai: z.boolean(),
})