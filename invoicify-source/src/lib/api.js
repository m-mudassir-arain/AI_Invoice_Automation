// Service layer for invoice generation.
// In production this posts to a backend endpoint that returns a hosted
// PDF link and a cloud storage link. Swap MOCK_MODE off and set
// VITE_API_URL to point this at the real endpoint.

const MOCK_MODE = true
const API_URL = import.meta.env.VITE_API_URL || '/api/generate-invoice'

export async function generateInvoice(payload) {
  if (MOCK_MODE) {
    await new Promise((resolve) => setTimeout(resolve, 1800))
    return {
      success: true,
      download_url: 'https://example.com/invoice.pdf',
      drive_url: 'https://drive.google.com/',
    }
  }

  const axios = (await import('axios')).default
  const { data } = await axios.post(API_URL, payload)
  return data
}
