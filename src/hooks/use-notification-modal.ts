import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAuthStore } from "@/lib/store/auth-store";
import { showErrorToast } from "@/components/ui/toast/show-toast";
import Cookies from "js-cookie";
import {
  getNotificationStatus,
  setNotificationLater,
  setNotificationConfigured,
} from "@/utils/notification-cookies";
import type { NotificationPreferences } from "@/utils/notification-cookies";

export const useNotificationModal = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  const { user } = useAuthStore(); // Uses zustand store to check if logged in

  useEffect(() => {
    // Only run on client
    const locationCookie = Cookies.get("user_location");
    const notificationStatus = getNotificationStatus();

    // Trigger Conditions:
    // 1. User is logged in
    // 2. User has a valid location set
    // 3. User has NOT interacted with the modal yet (no status)
    if (user && locationCookie && !notificationStatus) {
      setIsOpen(true);
    }
  }, [user]);

  const handleNextStep = () => {
    setCurrentStep(2);
  };

  const handleLater = () => {
    setNotificationLater();
    setIsOpen(false);
  };

  const handleConfirm = async (prefs: NotificationPreferences) => {
    // 1. Send preferences to backend
    try {
      // TODO: Replace with actual API endpoint
      // await axios.post('/api/user/notification-preferences', prefs);

      // 2. Set long term cookie
      setNotificationConfigured(prefs);

      // 3. Request native Web Push permission if any toggle is active
      if (prefs.auctions || prefs.sales || prefs.general) {
        if ("Notification" in window) {
          await window.Notification.requestPermission();
        }
      }
    } catch (_e) {
      showErrorToast(
        t("location_modal.geo_not_supported", "الموقع غير مدعوم في متصفحك"),
        {
          positionSm: "top-center",
          className: "toast-inline-full md:w-[550px]",
        }
      );
    } finally {
      setIsOpen(false);
    }
  };

  return {
    isOpen,
    currentStep,
    handleNextStep,
    handleLater,
    handleConfirm,
  };
};
