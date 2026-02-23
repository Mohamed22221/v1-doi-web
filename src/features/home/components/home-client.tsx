"use client";

import Link from "next/link";
import { useTranslation } from "@lib/i18n/client";
import type { Locale } from "@lib/i18n/config";

// UI Components
import { Card } from "@components/ui/card";
import { Separator } from "@components/ui/separator";

// Shared Components
import Icon from "@components/shared/icon-base";
import {
    UserIcon,
    UserPlusIcon,
    KeyIcon,
    CheckCircle2Icon,
    ArrowRightIcon,
    ShieldCheckIcon,
    HomeNavIcon,
} from "@components/shared/icon-base/constant";

export function HomeClient({ locale }: { locale: Locale }) {
    const { t } = useTranslation(locale, "common");

    const authSections = [
        {
            title: t("auth-dashboard.sections.buyer"),
            links: [
                {
                    label: t("auth-dashboard.links.login-phone"),
                    path: `/${locale}/buyer/login`,
                    icon: UserIcon,
                },
                {
                    label: t("auth-dashboard.links.login-password"),
                    path: `/${locale}/buyer/login-password`,
                    icon: ShieldCheckIcon,
                },
                {
                    label: t("auth-dashboard.links.register"),
                    path: `/${locale}/buyer/register`,
                    icon: UserPlusIcon,
                },
            ],
        },
        {
            title: t("auth-dashboard.sections.recovery"),
            links: [
                {
                    label: t("auth-dashboard.links.forgot"),
                    path: `/${locale}/buyer/forgot-password`,
                    icon: KeyIcon,
                },
                {
                    label: t("auth-dashboard.links.verify"),
                    path: `/${locale}/buyer/verify-otp`,
                    icon: ShieldCheckIcon,
                },
                {
                    label: t("auth-dashboard.links.reset"),
                    path: `/${locale}/buyer/reset-password`,
                    icon: KeyIcon,
                },
            ],
        },
        {
            title: t("auth-dashboard.sections.success"),
            links: [
                {
                    label: t("auth-dashboard.links.reg-success"),
                    path: `/${locale}/buyer/register-success`,
                    icon: CheckCircle2Icon,
                },
                {
                    label: t("auth-dashboard.links.reset-success"),
                    path: `/${locale}/buyer/reset-password-success`,
                    icon: CheckCircle2Icon,
                },
            ],
        },
        {
            title: t("auth-dashboard.sections.landing"),
            links: [
                {
                    label: t("auth-dashboard.links.seller-landing"),
                    path: `/${locale}/seller`,
                    icon: HomeNavIcon,
                },
                {
                    label: t("auth-dashboard.links.buyer-landing"),
                    path: `/${locale}/buyer`,
                    icon: HomeNavIcon,
                },
            ],
        },
        {
            title: t("auth-dashboard.sections.dashboard"),
            links: [
                {
                    label: t("auth-dashboard.links.seller-dashboard"),
                    path: `/${locale}/dashboard/seller`,
                    icon: ShieldCheckIcon,
                },
                {
                    label: t("auth-dashboard.links.buyer-dashboard"),
                    path: `/${locale}/dashboard/buyer`,
                    icon: UserIcon,
                },
            ],
        },
    ];

    return (
        <div>
            <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="mb-12 text-center">
                    <h1 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl dark:text-neutral-50">
                        {t("auth-dashboard.title")}
                    </h1>
                    <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">
                        {t("auth-dashboard.subtitle")}
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {authSections.map((section) => (
                        <Card
                            key={section.title}
                            className="flex flex-col border-neutral-200/60 dark:border-neutral-800"
                        >
                            <div className="p-6">
                                <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-50">
                                    {section.title}
                                </h2>
                                <Separator className="my-4" />
                                <div className="space-y-3">
                                    {section.links.map((link) => (
                                        <Link
                                            key={link.path}
                                            href={link.path}
                                            className="group flex items-center justify-between rounded-lg border border-transparent p-2 transition-all hover:border-neutral-200 hover:bg-neutral-100 dark:hover:border-neutral-700 dark:hover:bg-neutral-800"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                                                    <Icon icon={link.icon} className="h-5 w-5" />
                                                </div>
                                                <span className="font-medium text-neutral-700 dark:text-neutral-300">
                                                    {link.label}
                                                </span>
                                            </div>
                                            <Icon
                                                icon={ArrowRightIcon}
                                                className="h-4 w-4 text-neutral-400 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
                                            />
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </main>
        </div>
    );
}
