import { useCallback } from "react";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../../app/store/hooks";
import {
  setFormField,
  setAllFormFields,
  nextStep,
  prevStep,
  goToStep,
  setSubmitting,
  setCompleted,
} from "../state/onboardingSlice";
import { onboardingApi } from "../api/onboardingApi";
import { setCredentials } from "../../auth/state/authSlice";
import { setAccessToken } from "../../../lib/api";
import useNotification from "../../../app/components/notification/useNotification";

export default function useOnboarding() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { success, error } = useNotification();
  const { currentStep, totalSteps, isCompleted, isSubmitting, formData } =
    useAppSelector((state) => state.onboarding);

  const updateField = useCallback(
    (field, value) => {
      dispatch(setFormField({ field, value }));
    },
    [dispatch]
  );

  const updateFields = useCallback(
    (fields) => {
      dispatch(setAllFormFields(fields));
    },
    [dispatch]
  );

  const goNext = useCallback(() => {
    dispatch(nextStep());
  }, [dispatch]);

  const goPrev = useCallback(() => {
    dispatch(prevStep());
  }, [dispatch]);

  const goTo = useCallback(
    (step) => {
      dispatch(goToStep(step));
    },
    [dispatch]
  );

  const submit = useCallback(async () => {
    dispatch(setSubmitting(true));
    try {
      const res = await onboardingApi.onboard(formData);
      const { accessToken } = res.data;
      if (accessToken) {
        setAccessToken(accessToken);
        dispatch(setCredentials({ user: res.data.user || res.data.sanitizedUser, accessToken }));
      }
      dispatch(setCompleted());
      success("Organization created successfully");
      navigate("/dashboard", { replace: true });
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to create organization";
      error(msg);
    } finally {
      dispatch(setSubmitting(false));
    }
  }, [formData, dispatch, success, error, navigate]);

  return {
    currentStep,
    totalSteps,
    isCompleted,
    isSubmitting,
    formData,
    updateField,
    updateFields,
    goNext,
    goPrev,
    goTo,
    submit,
  };
}
