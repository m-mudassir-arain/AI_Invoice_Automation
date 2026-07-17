import { motion } from 'framer-motion'
import { CheckCircle2, Download, FolderOpen, RefreshCcw, X, AlertCircle } from 'lucide-react'
import Button from './ui/Button'

export default function SuccessModal({ result, onClose, onGenerateAnother }) {
  const success = result?.success

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="absolute inset-0 bg-heading/40 backdrop-blur-sm"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="success-title"
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 320, damping: 28 }}
        className="relative bg-white w-full max-w-md rounded-3xl shadow-elevation-4 p-8 text-center"
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 p-2 rounded-full text-paragraph hover:bg-section hover:text-heading transition-colors"
        >
          <X size={18} />
        </button>

        {success ? (
          <>
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.1 }}
              className="mx-auto w-16 h-16 rounded-full bg-emerald-50 grid place-items-center mb-5"
            >
              <CheckCircle2 size={34} className="text-success" strokeWidth={2} />
            </motion.div>

            <h3 id="success-title" className="text-xl font-extrabold text-heading">
              Invoice Generated Successfully
            </h3>
            <p className="mt-2 text-sm text-paragraph leading-relaxed">
              Your PDF is ready to download and has been saved to your cloud storage.
            </p>

            <div className="mt-7 flex flex-col gap-3">
              <a href={result.download_url} target="_blank" rel="noreferrer">
                <Button size="lg" icon={Download} iconPosition="left" className="w-full justify-center">
                  Download PDF
                </Button>
              </a>
              <a href={result.drive_url} target="_blank" rel="noreferrer">
                <Button size="lg" variant="secondary" icon={FolderOpen} iconPosition="left" className="w-full justify-center">
                  Open in Drive
                </Button>
              </a>
              <button
                onClick={onGenerateAnother}
                className="mt-1 inline-flex items-center justify-center gap-2 text-sm font-semibold text-primary hover:text-blue-700 transition-colors py-2"
              >
                <RefreshCcw size={15} /> Generate another
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="mx-auto w-16 h-16 rounded-full bg-red-50 grid place-items-center mb-5">
              <AlertCircle size={34} className="text-red-500" strokeWidth={2} />
            </div>
            <h3 className="text-xl font-extrabold text-heading">Something went wrong</h3>
            <p className="mt-2 text-sm text-paragraph leading-relaxed">
              We couldn't generate your invoice. Please check your details and try again.
            </p>
            <Button size="lg" className="mt-7 w-full justify-center" onClick={onClose}>
              Try again
            </Button>
          </>
        )}
      </motion.div>
    </motion.div>
  )
}
