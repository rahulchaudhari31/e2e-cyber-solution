import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Clock,
  Mail,
  MapPin,
  Navigation,
  Phone,
} from "lucide-react";
import PageHero from "../components/ui/PageHero";
import Button from "../components/ui/Button";
import Reveal from "../components/ui/Reveal";
import SocialIcon from "../components/ui/SocialIcon";
import Seo from "../components/seo/Seo";
import { contact, serviceGroups, site } from "../data/content";
import { placeholderImages } from "../data/placeholders";
import submitForm from "../utils/submitForm";
import styles from "./Contact.module.css";

const initialValues = {
  name: "",
  email: "",
  phone: "",
  service: "",
  message: "",
};

const validate = {
  name: (value) =>
    value.trim().length >= 2 ? "" : "Please enter your name.",
  email: (value) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim())
      ? ""
      : "Enter a valid email address.",
  phone: (value) =>
    !value.trim() || /^[+()\d\s-]{7,20}$/.test(value.trim())
      ? ""
      : "Enter a valid phone number or leave this blank.",
  service: (value) => (value ? "" : "Please choose a service."),
  message: (value) =>
    value.trim().length >= 10
      ? ""
      : "Tell us a little more — at least 10 characters.",
};

const mapHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.address.mapQuery)}`;

export default function Contact() {
  const reduced = useReducedMotion();
  const formRef = useRef(null);
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState("idle");
  const [serverError, setServerError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setValues((current) => ({ ...current, [name]: value }));
    setServerError("");
    if (status === "error") setStatus("idle");

    if (touched[name]) {
      setErrors((current) => ({
        ...current,
        [name]: validate[name]?.(value) ?? "",
      }));
    }
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;

    setTouched((current) => ({ ...current, [name]: true }));
    setErrors((current) => ({
      ...current,
      [name]: validate[name]?.(value) ?? "",
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nextErrors = Object.fromEntries(
      Object.keys(initialValues).map((field) => [
        field,
        validate[field]?.(values[field]) ?? "",
      ]),
    );

    setErrors(nextErrors);
    setTouched(
      Object.fromEntries(Object.keys(initialValues).map((field) => [field, true])),
    );

    if (Object.values(nextErrors).some(Boolean)) {
      window.setTimeout(() => {
        formRef.current?.querySelector('[aria-invalid="true"]')?.focus();
      }, 0);
      return;
    }

    setStatus("sending");
    setServerError("");

    try {
      await submitForm({ ...values, page: window.location.href });
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setServerError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    }
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setServerError("");
    setStatus("idle");
    window.setTimeout(() => {
      formRef.current?.querySelector("input")?.focus();
    }, 50);
  };

  const fieldClass = (name) =>
    [
      styles.field,
      values[name] ? styles.filled : "",
      touched[name] && errors[name] ? styles.invalid : "",
    ]
      .filter(Boolean)
      .join(" ");

  return (
    <>
      <Seo
        title="Contact Us"
        description={contact.subtitle}
        path="/contact"
      />
      <PageHero
        eyebrow={contact.eyebrow}
        title={contact.heading}
        subtitle={contact.subtitle}
          image={placeholderImages.contactHero.src}
          imageAlt={placeholderImages.contactHero.alt}
          imageWidth={placeholderImages.contactHero.width}
          imageHeight={placeholderImages.contactHero.height}
        breadcrumbs={[{ label: "Contact Us" }]}
        accent="orange"
      >
        <Button href={site.phoneHref}>Call {site.phone}</Button>
        <Button href={site.emailHref} variant="outline">
          Email us
        </Button>
      </PageHero>

      <section className={`section ${styles.section}`}>
        <div className={`container ${styles.grid}`}>
          <Reveal className={styles.formCard} y={24}>
            <div className={styles.formIntro}>
              <span className={styles.kicker}>Project enquiry</span>
              <h2 className={styles.title}>Tell us what you’re building.</h2>
              <p className={styles.intro}>{contact.intro}</p>
            </div>

            {status === "success" ? (
              <motion.div
                className={styles.success}
                role="status"
                initial={reduced ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              >
                <motion.span
                  className={styles.successIcon}
                  initial={reduced ? false : { scale: 0, rotate: -24 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 240, damping: 16 }}
                >
                  <Check size={28} strokeWidth={2.4} />
                </motion.span>
                <h3>Message received.</h3>
                <p>
                  Thanks, {values.name.split(" ")[0] || "there"}. Your enquiry is
                  in — we’ll be in touch within one working day.
                </p>
                <button type="button" className={styles.again} onClick={resetForm}>
                  Send another message
                  <ArrowRight size={15} strokeWidth={2} />
                </button>
              </motion.div>
            ) : (
              <form
                ref={formRef}
                className={styles.form}
                onSubmit={handleSubmit}
                noValidate
              >
                <div className={styles.row}>
                  <div className={styles.fieldBlock}>
                    <div className={fieldClass("name")}>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        placeholder=" "
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        aria-invalid={Boolean(touched.name && errors.name)}
                        aria-describedby={
                          touched.name && errors.name ? "contact-name-error" : undefined
                        }
                      />
                      <label htmlFor="contact-name">{contact.form.name}</label>
                    </div>
                    <span className={styles.error} id="contact-name-error">
                      {touched.name ? errors.name : ""}
                    </span>
                  </div>

                  <div className={styles.fieldBlock}>
                    <div className={fieldClass("email")}>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder=" "
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        aria-invalid={Boolean(touched.email && errors.email)}
                        aria-describedby={
                          touched.email && errors.email
                            ? "contact-email-error"
                            : undefined
                        }
                      />
                      <label htmlFor="contact-email">{contact.form.email}</label>
                    </div>
                    <span className={styles.error} id="contact-email-error">
                      {touched.email ? errors.email : ""}
                    </span>
                  </div>
                </div>

                <div className={styles.row}>
                  <div className={styles.fieldBlock}>
                    <div className={fieldClass("phone")}>
                      <input
                        id="contact-phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        placeholder=" "
                        value={values.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        aria-invalid={Boolean(touched.phone && errors.phone)}
                        aria-describedby={
                          touched.phone && errors.phone
                            ? "contact-phone-error"
                            : undefined
                        }
                      />
                      <label htmlFor="contact-phone">
                        {contact.form.phone}{" "}
                        <span className={styles.optional}>optional</span>
                      </label>
                    </div>
                    <span className={styles.error} id="contact-phone-error">
                      {touched.phone ? errors.phone : ""}
                    </span>
                  </div>

                  <div className={styles.fieldBlock}>
                    <div
                      className={`${fieldClass("service")} ${styles.selectField}`}
                    >
                      <select
                        id="contact-service"
                        name="service"
                        value={values.service}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        aria-invalid={Boolean(touched.service && errors.service)}
                        aria-describedby={
                          touched.service && errors.service
                            ? "contact-service-error"
                            : undefined
                        }
                      >
                        <option value="" disabled>
                          Select a service
                        </option>
                        <option value="General enquiry">General enquiry</option>
                        {serviceGroups.map((group) => (
                          <optgroup key={group.slug} label={group.title}>
                            <option value={group.title}>{group.title}</option>
                            {group.services.map((service) => (
                              <option key={service.slug} value={service.title}>
                                {service.title}
                              </option>
                            ))}
                          </optgroup>
                        ))}
                      </select>
                      <label htmlFor="contact-service">
                        {contact.form.service}
                      </label>
                    </div>
                    <span className={styles.error} id="contact-service-error">
                      {touched.service ? errors.service : ""}
                    </span>
                  </div>
                </div>

                <div className={styles.fieldBlock}>
                  <div className={fieldClass("message")}>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows="5"
                      placeholder=" "
                      value={values.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      aria-invalid={Boolean(touched.message && errors.message)}
                      aria-describedby={
                        touched.message && errors.message
                          ? "contact-message-error"
                          : undefined
                      }
                    />
                    <label htmlFor="contact-message">
                      {contact.form.message}
                    </label>
                  </div>
                  <span className={styles.error} id="contact-message-error">
                    {touched.message ? errors.message : ""}
                  </span>
                </div>

                {serverError ? (
                  <p className={styles.formError} role="alert">
                    {serverError}
                  </p>
                ) : null}

                <div className={styles.formFoot}>
                  <Button
                    type="submit"
                    size="lg"
                    className={styles.submitButton}
                    disabled={status === "sending"}
                  >
                    {status === "sending" ? "Sending…" : contact.form.submit}
                  </Button>
                  <p className={styles.responseNote}>
                    <Clock size={13} strokeWidth={2} />
                    Usually replies within one working day
                  </p>
                </div>
              </form>
            )}
          </Reveal>

          <div className={styles.side}>
            <Reveal className={styles.infoGrid} delay={0.05} y={22}>
              <a href={site.phoneHref} className={styles.infoCard}>
                <span className={styles.infoIcon}>
                  <Phone size={18} strokeWidth={1.8} />
                </span>
                <span className={styles.infoCopy}>
                  <small>{contact.newAccounts}</small>
                  <strong>{site.phone}</strong>
                </span>
                <ArrowUpRight size={15} strokeWidth={1.9} />
              </a>

              <a href={site.emailHref} className={styles.infoCard}>
                <span className={styles.infoIcon}>
                  <Mail size={18} strokeWidth={1.8} />
                </span>
                <span className={styles.infoCopy}>
                  <small>Email</small>
                  <strong>{site.email}</strong>
                </span>
                <ArrowUpRight size={15} strokeWidth={1.9} />
              </a>

              <a
                href={mapHref}
                className={styles.infoCard}
                target="_blank"
                rel="noreferrer"
              >
                <span className={styles.infoIcon}>
                  <MapPin size={18} strokeWidth={1.8} />
                </span>
                <span className={styles.infoCopy}>
                  <small>Visit us</small>
                  <strong>
                    {site.address.line1}, {site.address.city},{" "}
                    {site.address.postcode}
                  </strong>
                </span>
                <ArrowUpRight size={15} strokeWidth={1.9} />
              </a>
            </Reveal>

            <Reveal className={styles.socialCard} delay={0.1} y={22}>
              <div>
                <span className={styles.cardKicker}>Follow along</span>
                <h3 className={styles.sideTitle}>Elsewhere on the internet.</h3>
              </div>
              <div className={styles.socials}>
                {site.socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className={styles.social}
                    aria-label={social.label}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <SocialIcon name={social.icon} size={17} />
                  </a>
                ))}
              </div>
            </Reveal>

            <Reveal className={styles.mapCard} delay={0.14} y={22}>
              <div
                className={styles.mapPlaceholder}
                role="img"
                aria-label={`Map placeholder for ${site.address.display}`}
              >
                <span className={styles.mapGrid} aria-hidden="true" />
                <span className={styles.mapRoadOne} aria-hidden="true" />
                <span className={styles.mapRoadTwo} aria-hidden="true" />
                <span className={styles.mapPin} aria-hidden="true">
                  <MapPin size={22} strokeWidth={2} />
                </span>
                <div className={styles.mapLabel}>
                  <small>Our studio</small>
                  <strong>{site.address.display}</strong>
                </div>
              </div>
              <a
                href={mapHref}
                className={styles.mapLink}
                target="_blank"
                rel="noreferrer"
              >
                Open in Google Maps
                <Navigation size={14} strokeWidth={2} />
              </a>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
