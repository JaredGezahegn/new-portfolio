import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'
import SectionWrapper from '../components/SectionWrapper'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [status, setStatus] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init("3fJbP1acWUm4ct5RG")
  }, [])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Simple validation
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('Please fill in all fields!')
      return
    }

    // Set loading state
    setIsLoading(true)
    setStatus('Sending your message...')

    try {
      // Send email using EmailJS
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message
      }

      await emailjs.send(
        "service_lg1u5l6",  // Service ID
        "template_o4h08r9", // Template ID
        templateParams
      )

      // Success
      setStatus('Message sent! I\'ll get back to you soon! 🏴‍☠️')
      setFormData({ name: '', email: '', message: '' })
      
      setTimeout(() => setStatus(''), 5000)
    } catch (error) {
      console.error('EmailJS error:', error)
      setStatus('Sorry, there was an error sending your message. Please try again or contact me directly at jaredgezahegn@gmail.com')
      
      setTimeout(() => setStatus(''), 7000)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <SectionWrapper id="contact">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-pirate text-pirate-gold mb-4">
            Den Den Mushi
          </h2>
          <p className="text-xl text-gray-300">
            Send me a message through the transponder snail!
          </p>
        </div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <div className="paper-texture rounded-lg p-8 border-2 border-ink-black shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-ink-black font-bold mb-2">
                  Name <span className="text-pirate-red">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border-2 border-ink-black focus:border-pirate-red focus:outline-none bg-white text-ink-black"
                  placeholder="Your Name"
                  required
                />
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-ink-black font-bold mb-2">
                  Email <span className="text-pirate-red">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border-2 border-ink-black focus:border-pirate-red focus:outline-none bg-white text-ink-black"
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-ink-black font-bold mb-2">
                  Message <span className="text-pirate-red">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  className="w-full px-4 py-3 rounded-lg border-2 border-ink-black focus:border-pirate-red focus:outline-none bg-white text-ink-black resize-none"
                  placeholder="Tell me about your project or just say hi!"
                  required
                ></textarea>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: isLoading ? 1 : 1.02 }}
                whileTap={{ scale: isLoading ? 1 : 0.98 }}
                className={`w-full bg-gradient-to-r from-pirate-red to-pirate-red-dark text-white font-bold py-4 px-6 rounded-lg border-2 border-pirate-gold transition-all duration-300 hover:shadow-lg hover:shadow-pirate-gold/50 ${
                  isLoading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? (
                  <>
                    <span className="inline-block animate-spin mr-2">⚓</span>
                    Sending...
                  </>
                ) : (
                  'Send Message 🏴‍☠️'
                )}
              </motion.button>

              {/* Status Message */}
              {status && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`text-center font-bold ${
                    status.includes('sent') 
                      ? 'text-green-600' 
                      : status.includes('Sending') 
                      ? 'text-blue-600' 
                      : 'text-pirate-red'
                  }`}
                >
                  {status}
                </motion.p>
              )}
            </form>
          </div>
        </motion.div>

        {/* Alternative Contact Info */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-8"
        >
          <p className="text-gray-300">
            Or reach out directly at{' '}
            <a
              href="mailto:jaredgezahegn@gmail.com"
              className="text-pirate-gold hover:text-pirate-gold-dark underline"
            >
              jaredgezahegn@gmail.com
            </a>
          </p>
        </motion.div>
      </motion.div>
    </SectionWrapper>
  )
}

export default Contact
