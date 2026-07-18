import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../../features/auth/state/authSlice";
import onboardingReducer from "../../features/onboarding/state/onboardingSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    onboarding: onboardingReducer,
  },
});
