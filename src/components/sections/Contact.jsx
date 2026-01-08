import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, MapPin, Phone, Github, Linkedin, Twitter, CheckCircle } from 'lucide-react';
import { SectionHeader, Button, Input, Textarea } from '../ui';
import { personalInfo } from '../../data';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would normally send the form data to a backend
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const contactInfo = [
    { icon: Mail, label: 'Email', value: personalInfo.social?.email || 'ayush23chaudhary@gmail.com', href: `mailto:${personalInfo.social?.email || 'ayush23chaudhary@gmail.com'}` },
    { icon: MapPin, label: 'Location', value: personalInfo.location || 'Mathura, India', href: null },
  ];

  const socialLinks = [
    { icon: Github, label: 'GitHub', href: personalInfo.social?.github || '#' },
    { icon: Linkedin, label: 'LinkedIn', href: personalInfo.social?.linkedin || '#' },
    { icon: Twitter, label: 'Twitter', href: personalInfo.social?.twitter || '#' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section 
      id="contact" 
      className="py-20 lg:py-32 bg-white dark:bg-dark-950"
      aria-label="Contact section"
    >
      <div className="section-container">
        <SectionHeader
          title="Get In Touch"
          subtitle="Have a project in mind or just want to say hello? I'd love to hear from you!"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid lg:grid-cols-2 gap-12 mt-16"
        >
          {/* Contact Info */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-dark-900 dark:text-white mb-4">
                Let's work together
              </h3>
              <p className="text-dark-600 dark:text-dark-400 leading-relaxed">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision. Feel free to reach out!
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-4">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="flex items-center gap-4 p-4 rounded-xl bg-dark-50 dark:bg-dark-900 border border-dark-200 dark:border-dark-800"
                >
                  <div className="p-3 rounded-lg bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400">
                    <item.icon size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-dark-500 dark:text-dark-400">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="text-dark-900 dark:text-white hover:text-primary-500 transition-colors">
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-dark-900 dark:text-white">{item.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <p className="text-sm text-dark-500 dark:text-dark-400 mb-4">Connect with me</p>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-lg bg-dark-100 dark:bg-dark-800 text-dark-600 dark:text-dark-400 hover:bg-primary-100 hover:text-primary-600 dark:hover:bg-primary-900/30 dark:hover:text-primary-400 transition-all"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.label}
                  >
                    <social.icon size={20} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={itemVariants}>
            <form onSubmit={handleSubmit} className="space-y-6 p-8 rounded-2xl bg-dark-50 dark:bg-dark-900 border border-dark-200 dark:border-dark-800">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                  <h4 className="text-xl font-bold text-dark-900 dark:text-white mb-2">Message Sent!</h4>
                  <p className="text-dark-600 dark:text-dark-400">Thank you for reaching out. I'll get back to you soon!</p>
                </motion.div>
              ) : (
                <>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input
                      label="Name"
                      name="name"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                    <Input
                      label="Email"
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <Input
                    label="Subject"
                    name="subject"
                    placeholder="What's this about?"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                  <Textarea
                    label="Message"
                    name="message"
                    placeholder="Tell me about your project..."
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                  <Button type="submit" className="w-full">
                    <Send size={18} className="mr-2" />
                    Send Message
                  </Button>
                </>
              )}
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
