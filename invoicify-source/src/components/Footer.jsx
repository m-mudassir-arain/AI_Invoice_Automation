import { FileStack, Globe, MessageCircle, Link2 } from 'lucide-react'

const columns = [
  {
    title: 'Product',
    links: ['Features', 'How It Works', 'Pricing'],
  },
  {
    title: 'Resources',
    links: ['Help Center', 'Guides', 'API Status'],
  },
  {
    title: 'Company',
    links: ['Privacy Policy', 'Terms', 'Contact'],
  },
]

export default function Footer() {
  return (
    <footer className="bg-heading text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <a href="#home" className="flex items-center gap-2.5">
              <span className="grid place-items-center w-9 h-9 rounded-xl bg-primary text-white">
                <FileStack size={18} strokeWidth={2.4} />
              </span>
              <span className="text-lg font-extrabold text-white">Invoicify</span>
            </a>
            <p className="mt-4 text-sm text-gray-400 leading-relaxed max-w-xs">
              Professional AI-generated invoices, delivered in seconds.
            </p>
            <div className="flex items-center gap-3 mt-6">
              {[Globe, MessageCircle, Link2].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 grid place-items-center transition-colors"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-white mb-4">{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">© {new Date().getFullYear()} Invoicify. All rights reserved.</p>
          <p className="text-xs text-gray-500">Designed for professionals who bill often.</p>
        </div>
      </div>
    </footer>
  )
}
