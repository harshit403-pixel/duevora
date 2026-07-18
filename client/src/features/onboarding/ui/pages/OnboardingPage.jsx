import { useState, useRef, useCallback, useEffect } from "react";
import useOnboarding from "../../hooks/useOnboarding";
import PrinterScene from "../components/jsx/PrinterScene.jsx";
import PrinterMachine from "../components/jsx/PrinterMachine.jsx";
import FallingReceipt from "../components/jsx/FallingReceipt.jsx";
import StepBusinessDetails from "../components/jsx/StepBusinessDetails.jsx";
import StepContacts from "../components/jsx/StepContacts.jsx";
import StepBusinessSetup from "../components/jsx/StepBusinessSetup.jsx";
import StepReview from "../components/jsx/StepReview.jsx";
import ProgressDots from "../components/jsx/ProgressDots.jsx";
import NextButton from "../components/jsx/NextButton.jsx";
import styles from "../components/css/OnboardingPage.module.css";

const STEP_META = [
  { num: "01", title: "Business Details", desc: "Tell us about your business\nso we can personalize your experience." },
  { num: "02", title: "Contacts", desc: "Add your primary contacts" },
  { num: "03", title: "Business Setup", desc: "Configure your preferences" },
  { num: "04", title: "Review & Finish", desc: "Review your information" },
];

const VALIDATORS = [
  (d) => {
    const e = {};
    if (!d.name?.trim()) e.name = "Organization name is required";
    if (!d.code?.trim()) e.code = "Organization code is required";
    else if (d.code.trim().length < 2) e.code = "Code must be at least 2 characters";
    return e;
  },
  (d) => {
    const e = {};
    if (!d.firstName?.trim()) e.firstName = "First name is required";
    if (!d.lastName?.trim()) e.lastName = "Last name is required";
    return e;
  },
  () => ({}),
  () => ({}),
];

export default function OnboardingPage() {
  const {
    currentStep,
    totalSteps,
    isSubmitting,
    formData,
    updateField,
    goNext,
    goPrev,
    goTo,
    submit,
  } = useOnboarding();

  const [errors, setErrors] = useState({});
  const [falling, setFalling] = useState(null);
  const [animating, setAnimating] = useState(false);
  const sectionRefs = useRef([]);
  const prevStepRef = useRef(currentStep);

  const validate = useCallback(() => {
    const validator = VALIDATORS[currentStep];
    const errs = validator(formData);
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }, [currentStep, formData]);

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      updateField(name, value);
      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: undefined }));
      }
    },
    [updateField, errors]
  );

  const triggerTearAnimation = useCallback(() => {
    if (animating) return;
    if (currentStep >= totalSteps - 1) {
      submit();
      return;
    }
    if (!validate()) return;

    setAnimating(true);

    const sectionEl = sectionRefs.current[currentStep];
    if (!sectionEl) {
      goNext();
      setAnimating(false);
      return;
    }

    const rect = sectionEl.getBoundingClientRect();
    const sectionHeight = rect.height;

    setFalling({
      stepIndex: currentStep,
      startX: rect.left,
      startY: rect.top,
      height: sectionHeight,
    });

    import("gsap").then(({ gsap }) => {
      gsap.to(sectionEl, {
        opacity: 0,
        height: 0,
        paddingTop: 0,
        paddingBottom: 0,
        duration: 0.4,
        ease: "power2.inOut",
        onComplete: () => {
          goNext();
          setFalling(null);

          setTimeout(() => {
            const nextEl = sectionRefs.current[currentStep + 1];
            if (nextEl) {
              gsap.fromTo(
                nextEl,
                { opacity: 0, y: -30, height: 0, paddingTop: 0, paddingBottom: 0 },
                {
                  opacity: 1,
                  y: 0,
                  height: "auto",
                  paddingTop: 28,
                  paddingBottom: 24,
                  duration: 0.5,
                  ease: "power2.out",
                }
              );
            }
            setAnimating(false);
          }, 50);
        },
      });
    });
  }, [animating, currentStep, totalSteps, formData, validate, goNext, submit]);

  const handleDotClick = useCallback(
    (step) => {
      if (step < currentStep) {
        goTo(step);
      }
    },
    [currentStep, goTo]
  );

  useEffect(() => {
    prevStepRef.current = currentStep;
  }, [currentStep]);

  const renderStep = (stepIdx) => {
    const common = { formData, errors, onChange: handleChange };
    switch (stepIdx) {
      case 0:
        return <StepBusinessDetails {...common} />;
      case 1:
        return <StepContacts {...common} />;
      case 2:
        return <StepBusinessSetup {...common} />;
      case 3:
        return <StepReview formData={formData} />;
      default:
        return null;
    }
  };

  return (
    <PrinterScene>
      <div className={styles.page}>
        <div className={styles.center}>
          <PrinterMachine />

          <div className={styles.paperArea}>
            <div className={styles.receiptWrapper}>
              {STEP_META.map((meta, idx) => {
                const isActive = idx === currentStep;
                const isCompleted = idx < currentStep;

                return (
                  <div
                    key={idx}
                    ref={(el) => (sectionRefs.current[idx] = el)}
                    className={`
                      ${styles.sectionWrap}
                      ${isActive ? styles.activeSection : ""}
                      ${isCompleted ? styles.completedSection : ""}
                      ${idx > currentStep ? styles.upcomingSection : ""}
                    `}
                    style={{
                      background: "#fff",
                      borderBottom: idx < totalSteps - 1 ? "2px dashed #d1d5db" : "none",
                      padding: isActive ? "28px 28px 24px" : undefined,
                      minHeight: isActive ? 280 : undefined,
                    }}
                  >
                    {isActive && (
                      <>
                        <p style={{
                          fontSize: 10,
                          fontWeight: 700,
                          letterSpacing: "2.5px",
                          textTransform: "uppercase",
                          color: "var(--color-accent)",
                          margin: "0 0 4px 0",
                        }}>
                          STEP {String(idx + 1).padStart(2, "0")} OF {String(totalSteps).padStart(2, "0")}
                        </p>
                        <p style={{
                          fontSize: 28,
                          fontWeight: 800,
                          color: "var(--color-accent)",
                          margin: "0 0 2px 0",
                          lineHeight: 1,
                        }}>
                          {meta.num}
                        </p>
                        <p style={{
                          fontSize: 18,
                          fontWeight: 700,
                          color: "var(--color-primary)",
                          margin: "0 0 4px 0",
                        }}>
                          {meta.title}
                        </p>
                        <p style={{
                          fontSize: 13,
                          color: "var(--color-text-secondary)",
                          margin: "0 0 20px 0",
                          lineHeight: 1.4,
                          whiteSpace: "pre-line",
                        }}>
                          {meta.desc}
                        </p>
                        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                          {renderStep(idx)}
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className={styles.nextArea}>
          <NextButton
            onClick={triggerTearAnimation}
            disabled={animating}
            isLast={currentStep === totalSteps - 1}
            isLoading={isSubmitting}
          />
        </div>

        <div className={styles.progressArea}>
          <ProgressDots
            currentStep={currentStep}
            totalSteps={totalSteps}
            onDotClick={handleDotClick}
          />
        </div>

        {falling && (
          <FallingReceipt
            stepIndex={falling.stepIndex}
            startX={falling.startX}
            startY={falling.startY}
            onComplete={() => setFalling(null)}
          />
        )}
      </div>
    </PrinterScene>
  );
}
