import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Play, X } from "lucide-react";
import styles from "./VideoModal.module.css";

const ease = [0.16, 1, 0.3, 1];

/*
 * DUMMY VIDEO SOURCE — replace with the final e2e showreel or per-project film.
 * The poster and all video card images are also placeholders.
 */
export const DUMMY_VIDEO_SOURCE =
  "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";

export default function VideoModal({ video, onClose }) {
  const reduced = useReducedMotion();
  const closeRef = useRef(null);

  useEffect(() => {
    if (!video) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus({ preventScroll: true });

    const handleKey = (event) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKey);
    };
  }, [video, onClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {video ? (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0 : 0.28, ease }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <motion.div
            className={styles.dialog}
            role="dialog"
            aria-modal="true"
            aria-labelledby="video-modal-title"
            initial={reduced ? false : { opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: reduced ? 0 : 0.42, ease }}
          >
            <div className={styles.header}>
              <div>
                <span className={styles.category}>{video.category}</span>
                <h2 id="video-modal-title">{video.title}</h2>
              </div>
              <button
                ref={closeRef}
                type="button"
                className={styles.close}
                onClick={onClose}
                aria-label="Close video"
              >
                <X size={18} strokeWidth={1.9} />
              </button>
            </div>

            <div className={styles.player}>
              <video
                src={video.src || DUMMY_VIDEO_SOURCE}
                poster={video.poster}
                controls
                autoPlay
                playsInline
              >
                Your browser does not support the video element.
              </video>
              <span className={styles.playerTag}>
                <Play size={12} fill="currentColor" strokeWidth={0} />
                Placeholder film
              </span>
            </div>

            <div className={styles.footer}>
              <p>{video.description}</p>
              <span>Replace the dummy video and poster with the final edit.</span>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
