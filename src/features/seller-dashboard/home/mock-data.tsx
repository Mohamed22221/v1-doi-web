import { Package, MessageSquare, Wallet, ShoppingBag, PlusCircle, Clock } from "lucide-react";
import type { StatCardData, ActionButtonData } from "./types";
import { Riyall } from "@/components/shared/icon-base/constant";
import Icon from "@/components/shared/icon-base";

export const SELLER_STATS: StatCardData[] = [
  {
    id: "sales",
    title: "إجمالي المبيعات",
    value: "2,000",
    badge: "+12%",
    badgePositive: true,
    subtitle: (
      <Icon
        icon={Riyall}
        className="h-[16px] w-[14px] text-neutral-950 md:h-[22px] md:w-[21px] dark:text-neutral-50"
        aria-hidden="true"
      />
    ),
    icon: <ShoppingBag className="h-[18px] w-[18px] md:h-[24px] md:w-[24px]" aria-hidden="true" />,
  },
  {
    id: "active",
    title: "المنشورات النشطة",
    value: "2",
    subtitle: "مزادات شغّالة الآن",
    icon: <Package className="h-[18px] w-[18px] md:h-[24px] md:w-[24px]" aria-hidden="true" />,
  },
  {
    id: "pending",
    title: "المنشورات المعلّقة",
    value: "2",
    subtitle: "إعلان",
    icon: <Clock className="h-[18px] w-[18px] md:h-[24px] md:w-[24px]" aria-hidden="true" />,
  },
  {
    id: "wallet",
    title: "رصيد المحفظة",
    value: "2,000",
    subtitle: (
      <Icon
        icon={Riyall}
        className="h-[16px] w-[14px] text-neutral-950 md:h-[22px] md:w-[21px] dark:text-neutral-50"
        aria-hidden="true"
      />
    ),
    icon: <Wallet className="h-[18px] w-[18px] md:h-[24px] md:w-[24px]" aria-hidden="true" />,
  },
];

export const SELLER_ACTIONS: ActionButtonData[] = [
  {
    id: "add",
    label: "إضافة منتج",
    icon: <PlusCircle className="h-6 w-6" aria-hidden="true" />,
  },
  {
    id: "wallet",
    label: "المحفظة",
    icon: <Wallet className="h-6 w-6" aria-hidden="true" />,
  },
  {
    id: "offers",
    label: "العروض",
    icon: <MessageSquare className="h-6 w-6" aria-hidden="true" />,
  },
  {
    id: "orders",
    label: "الطلبات",
    icon: <Package className="h-6 w-6" aria-hidden="true" />,
  },
];
