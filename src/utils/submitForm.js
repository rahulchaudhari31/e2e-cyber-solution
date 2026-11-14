const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

/*
 * Placeholder contact handler.
 *
 * This currently resolves locally so the form works during development.
 * To connect EmailJS, either set the VITE_EMAILJS_* variables and replace the
 * placeholder branch below with emailjs.send(...), or point
 * VITE_CONTACT_ENDPOINT at your own form endpoint.
 */
export default async function submitForm(payload) {
  const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT;

  if (endpoint) {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("We could not send your message. Please try again.");
    }

    return response.json().catch(() => ({ ok: true }));
  }

  if (
    EMAILJS_SERVICE_ID &&
    EMAILJS_TEMPLATE_ID &&
    EMAILJS_PUBLIC_KEY &&
    import.meta.env.VITE_EMAILJS_ENABLED === "true"
  ) {
    throw new Error(
      "EmailJS keys are present. Install @emailjs/browser and enable the EmailJS branch in submitForm.js.",
    );
  }

  await new Promise((resolve) => setTimeout(resolve, 900));

  if (import.meta.env.DEV) {
    console.info("[contact] Placeholder submission", payload);
  }

  return { ok: true, placeholder: true };
}
