# Contact Form Setup Guide

Your contact form has been updated to actually send messages! You need to choose one of these methods:

## 🚀 Option 1: Formspree (Recommended - FREE & Easy)

### Steps:
1. Go to [https://formspree.io/](https://formspree.io/)
2. Sign up with your email (GitHub login available)
3. Create a new form
4. Copy your form endpoint (looks like: `https://formspree.io/f/xyzabc123`)
5. Replace `YOUR_FORM_ID` in `Contact.jsx` line 22 with your actual form ID

**Example:**
```javascript
const response = await fetch('https://formspree.io/f/xyzabc123', {
```

**Benefits:**
- ✅ Free tier: 50 submissions/month
- ✅ Email notifications to your inbox
- ✅ Spam protection included
- ✅ No backend needed

---

## 📧 Option 2: EmailJS (Alternative)

### Steps:
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up and create a service
3. Install EmailJS: `npm install @emailjs/browser`
4. Replace the fetch code in Contact.jsx with EmailJS code

**Example EmailJS Code:**
```javascript
import emailjs from '@emailjs/browser';

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    await emailjs.sendForm(
      'YOUR_SERVICE_ID',
      'YOUR_TEMPLATE_ID',
      e.target,
      'YOUR_PUBLIC_KEY'
    );
    setIsSubmitted(true);
  } catch (error) {
    setError('Failed to send message');
  } finally {
    setIsSubmitting(false);
  }
};
```

---

## 🔧 Option 3: Simple mailto: Link (No Setup Required)

If you want something that works immediately without any setup:

Replace the form submit button with a mailto link:

```jsx
<a 
  href={`mailto:ayush23chaudhary@gmail.com?subject=${formData.subject}&body=${formData.message}`}
  className="btn-primary w-full"
>
  Send via Email
</a>
```

---

## ⚡ Quick Setup (5 minutes):

1. **Go to Formspree.io** → Sign up
2. **Create Form** → Copy form ID
3. **Edit Contact.jsx** → Line 22 → Replace `YOUR_FORM_ID`
4. **Test it!** → Submit a test message

---

## 📝 Current Status:

The code is ready! You just need to:
- [ ] Choose a method (Formspree recommended)
- [ ] Replace `YOUR_FORM_ID` in Contact.jsx
- [ ] Test the form

Messages will be sent to: **ayush23chaudhary@gmail.com**
