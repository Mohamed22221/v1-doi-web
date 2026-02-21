"use client";

// UI Components
import { Button } from "@components/ui/button";
import Icon from "@/components/shared/icon-base";
import { AppleIcon, GoogleIcon } from "@/components/shared/icon-base/constant";

// i18n
import { useTranslation } from "@/lib/i18n/client";
import type { Locale } from "@/lib/i18n/config";

interface BuyerSocialActionsProps {
    locale: Locale;
}

export function BuyerSocialActions({ locale }: BuyerSocialActionsProps) {
    const { t } = useTranslation(locale, "auth");

    const handleGoogleLogin = () => {
        // TODO: Implement Google Login logic
        console.info("Google Login clicked");
    };

    const handleAppleLogin = () => {
        // TODO: Implement Apple Login logic
        console.info("Apple Login clicked");
    };

    return (
        <div className="flex w-full flex-col items-center justify-center gap-4 tablet:flex-row">
            <Button
                variant="outline"
                className="h-[48px] min-w-full text-label tablet:h-[50px] tablet:min-w-[240px] tablet:text-body xl:h-[56px] xl:text-h5"
                rounded="xl"
                onClick={handleGoogleLogin}
            >
                <Icon icon={GoogleIcon} />
                <span className="font-semibold text-primary-800 dark:text-neutral-50">Google</span>
            </Button>
            <Button
                variant="outline"
                className="h-[48px] min-w-full text-label tablet:h-[50px] tablet:min-w-[240px] tablet:text-body xl:h-[56px] xl:text-h5"
                rounded="xl"
                onClick={handleAppleLogin}
            >
                <Icon icon={AppleIcon} className="text-neutral-950 dark:text-neutral-50" />
                <span className="font-semibold text-primary-800 dark:text-neutral-50">Apple</span>
            </Button>
        </div>
    );
}
