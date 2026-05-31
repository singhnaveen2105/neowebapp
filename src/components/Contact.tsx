"use client";

import emailjs from "@emailjs/browser";
import { useState } from "react";

export default function Contact() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle"
  );

  const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !message) {
      setStatus("error");
      return;
    }

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      console.error("EmailJS environment variables are not set.");
      setStatus("error");
      return;
    }

    setStatus("sending");
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        { from_email: email, message },
        PUBLIC_KEY
      );
      setStatus("success");
      setEmail("");
      setMessage("");
    } catch (err) {
      console.error("Failed to send email", err);
      setStatus("error");
    }
  };

  return (
    <section
      className="bg-gray-100 px-4 py-16 sm:px-6 lg:px-8 lg:py-24 dark:bg-gray-900/50"
      id="contact"
    >
      <div className="mx-auto max-w-xl">
        <h2 className="mb-8 text-center text-3xl font-bold text-gray-900 dark:text-white">
          Get In Touch
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
              htmlFor="email"
            >
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-600 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
              id="email"
              name="email"
              placeholder="you@example.com"
              type="email"
              required
            />
          </div>
          <div>
            <label
              className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
              htmlFor="message"
            >
              Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-600 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
              id="message"
              name="message"
              placeholder="Your message..."
              rows={4}
              required
            />
          </div>
          <div className="text-right">
            <button
              className="transform rounded-lg bg-blue-600 px-8 py-3 font-bold text-white transition-all duration-300 hover:scale-105 hover:bg-blue-700 disabled:opacity-60"
              type="submit"
              disabled={status === "sending"}
            >
              {status === "sending" ? "Sending..." : "Send Message"}
            </button>
          </div>
          <div aria-live="polite">
            {status === "success" && (
              <p className="mt-2 text-green-600">
                Message sent — thanks! I&apos;ll get back to you soon.
              </p>
            )}
            {status === "error" && (
              <p className="mt-2 text-red-600">
                Failed to send message. Please try again later.
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
