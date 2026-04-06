"use client";

import { useTranslation } from "react-i18next";
import { 
  ResponsiveModal, 
  ResponsiveModalContent,
  ResponsiveModalHeader,
  ResponsiveModalTitle 
} from "@/components/ui/responsive-modal";
import { NotificationPrompt } from "./notification-prompt";
import { NotificationSettings } from "./notification-settings";
import { useNotificationModal } from "@/hooks/use-notification-modal";

export const NotificationModal = () => {
  const { t } = useTranslation();
  const { isOpen, currentStep, handleLater, handleNextStep, handleConfirm } =
    useNotificationModal();

  return (
    <ResponsiveModal open={isOpen} onOpenChange={(open) => !open && handleLater()}>
      <ResponsiveModalContent className="md:max-w-[550px]">
        {/* Accessibility Title (Visually Hidden) */}
        <ResponsiveModalHeader className="sr-only">
          <ResponsiveModalTitle>{t("notification_modal.notification")}</ResponsiveModalTitle>
        </ResponsiveModalHeader>

        {currentStep === 1 ? (
          <NotificationPrompt onAllow={handleNextStep} onLater={handleLater} />
        ) : (
          <NotificationSettings onConfirm={handleConfirm} onLater={handleLater} />
        )}
      </ResponsiveModalContent>
    </ResponsiveModal>
  );
};
