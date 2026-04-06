"use client";

import * as React from "react";
import Cookies from "js-cookie";
import { Search } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  ResponsiveModal,
  ResponsiveModalContent,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
  ResponsiveModalDescription,
} from "@/components/ui/responsive-modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@utils/cn";
import { showErrorToast } from "@/components/ui/toast/show-toast";
import { Spinner } from "@/components/ui/spinner";

/**
 * Interface representing a city in the location selection list.
 * Ensuring type safety and avoiding "any" casts.
 */
interface City {
  id: string;
  name_ar: string;
  name_en: string;
}

type LocaleSuffix = "ar" | "en";

const POPULAR_CITIES: City[] = [
  { id: "riyadh", name_ar: "الرياض", name_en: "Riyadh" },
  { id: "jeddah", name_ar: "جدة", name_en: "Jeddah" },
  { id: "dammam", name_ar: "الدمام", name_en: "Dammam" },
  { id: "khobar", name_ar: "الخبر", name_en: "Khobar" },
  { id: "mecca", name_ar: "مكة", name_en: "Mecca" },
  { id: "medina", name_ar: "المدينة", name_en: "Medina" },
  { id: "abha", name_ar: "أبها", name_en: "Abha" },
  { id: "tabuk", name_ar: "تبوك", name_en: "Tabuk" },
];

export function LocationModal() {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCity, setSelectedCity] = React.useState<string | null>(POPULAR_CITIES[0].id);
  const [isGeoLoading, setIsGeoLoading] = React.useState(false);

  const localeSuffix: LocaleSuffix = i18n.language === "ar" ? "ar" : "en";

  React.useEffect(() => {
    // Only check on client-side
    const locationCookie = Cookies.get("user_location");
    // If no location set AND no auth token (Guest), show modal after a small delay
    if (!locationCookie) {
      setIsOpen(true);
    }
  }, []);

  const saveLocation = (cityId: string) => {
    Cookies.set("user_location", cityId, { expires: 30 });
    setIsOpen(false);
  };

  const handleConfirm = () => {
    if (selectedCity) {
      saveLocation(selectedCity);
    }
  };

  const handleGeoLocation = () => {
    if (!navigator.geolocation) {
      showErrorToast(t("location_modal.geo_not_supported", "الموقع غير مدعوم في متصفحك"), {
        positionSm: "top-center",
        className: "toast-inline-full md:w-[550px]",
      });
      return;
    }

    setIsGeoLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        // In a real app, we would reverse-geocode this.
        saveLocation(`geo:${latitude},${longitude}`);
        setIsGeoLoading(false);
      },
      (_error) => {
        showErrorToast(t("location_modal.geo_error", "حدث خطأ أثناء تحديد موقعك"), {
          positionSm: "top-center",
          className: "toast-inline-full md:w-[550px]",
        });
        setIsGeoLoading(false);
      },
    );
  };

  const handleOpenChange = (open: boolean) => {
    // If closing without selection, default to the first city (Riyadh) to fulfill user story fallback
    if (!open && !Cookies.get("user_location")) {
      saveLocation(POPULAR_CITIES[0].id);
    }
    setIsOpen(open);
  };

  const filteredCities = POPULAR_CITIES.filter((city) =>
    city[`name_${localeSuffix}`].toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <ResponsiveModal open={isOpen} onOpenChange={handleOpenChange}>
      <ResponsiveModalContent className="gap-4 px-5 py-0 pb-7 md:max-w-[540px] md:gap-6 md:py-6 md:pb-5">
        <ResponsiveModalHeader className="gap-3 px-0 py-1 md:p-4 md:text-center">
          <ResponsiveModalTitle className="text-start text-xl font-bold tracking-tight text-neutral-800 md:mt-4 md:text-center md:text-h4 dark:text-neutral-100">
            {t("location_modal.title", "حدد منطقتك لاستكشاف المنتجات والمزادات القريبة منك")}
          </ResponsiveModalTitle>
          <ResponsiveModalDescription className="text-start text-tag font-bold tracking-[0.54px] text-neutral-600 opacity-75 md:text-center md:text-label dark:text-neutral-300">
            {t(
              "location_modal.subtitle",
              "اختيار المنطقة يساعدنا نعرض لك منتجات ومزادات مناسبة لموقعك.",
            )}
          </ResponsiveModalDescription>
        </ResponsiveModalHeader>

        <div className="flex flex-col gap-4 md:gap-4">
          <div className="flex flex-col gap-2">
            <span className="hidden font-bold text-neutral-800 md:block md:text-h5">
              {t("location_modal.location_label", "الموقع")}
            </span>
            <div className="relative">
              <Input
                placeholder={t("location_modal.search_placeholder", "ابحث عن اسم المدينة")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-[52px] rounded-md border-primary-100 px-4 ps-12 text-start text-body text-neutral-600 placeholder:text-neutral-400 focus-visible:ring-1"
              />
              <Search className="absolute start-4 top-1/2 size-6 -translate-y-1/2 text-neutral-400" />
            </div>
          </div>

          <div className="flex flex-wrap justify-start gap-3">
            {filteredCities.map((city) => (
              <Button
                type="button"
                key={city.id}
                onClick={() => setSelectedCity(city.id)}
                variant={selectedCity === city.id ? "default" : "secondary"}
                className={cn(
                  "h-[36px] rounded-sm px-4 text-body transition-colors md:h-10 md:px-7",
                  selectedCity === city.id ? "bg-primary-500 text-neutral-10" : "text-primary-800",
                )}
              >
                {city[`name_${localeSuffix}`]}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <Button
            variant="secondary"
            rounded="md"
            className="h-[50px] flex-1 text-label font-bold text-primary-800 md:h-14 md:text-body"
            onClick={handleGeoLocation}
            disabled={isGeoLoading}
          >
            {isGeoLoading && <Spinner data-icon="inline-start" />}
            {t("location_modal.use_current_location", "استخدام الموقع الحالي")}
          </Button>
          <Button
            className="h-[50px] flex-1 text-label font-bold text-neutral-10 md:h-14 md:text-body"
            rounded="md"
            onClick={handleConfirm}
            disabled={!selectedCity}
          >
            {t("location_modal.confirm_region", "تأكيد المنطقة")}
          </Button>
        </div>
      </ResponsiveModalContent>
    </ResponsiveModal>
  );
}
