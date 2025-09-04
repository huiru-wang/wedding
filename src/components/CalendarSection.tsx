"use client";

import { useMemo } from "react";
import Image from "next/image";
import { WEDDING_CONFIG } from "@/lib/config";

function getMonthMatrix(date: Date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const startWeekday = firstDay.getDay(); // 0-6 (Sun-Sat)
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const cells: (number | null)[] = [];
    for (let i = 0; i < startWeekday; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);
    while (cells.length % 7 !== 0) cells.push(null);
    return cells;
}

// 判断是否为假期（1-8号）
function isHoliday(day: number | null): boolean {
    return day !== null && day >= 1 && day <= 8;
}

// 婚礼当天图片组件
function WeddingDayImage() {
    return (
        <div className="absolute inset-0 rounded-md overflow-hidden">
            <Image
                src={WEDDING_CONFIG.weddingDayImage}
                alt="婚礼日"
                fill
                className="object-cover"
            />
        </div>
    );
}

export default function CalendarSection() {
    const target = useMemo(() => new Date(WEDDING_CONFIG.weddingDateTime), []);
    const matrix = useMemo(() => getMonthMatrix(target), [target]);
    const year = target.getFullYear();
    const month = target.getMonth() + 1;
    const day = target.getDate();

    const weekdayLabels = ["日", "一", "二", "三", "四", "五", "六"];

    return (
        <section className="min-h-screen h-screen w-full snap-start flex items-center justify-center px-6 py-10 bg-background text-foreground">
            <div className="w-full max-w-2xl">
                <h2 className="text-center text-2xl sm:text-3xl font-semibold mb-6">
                    {year}年{month}月
                </h2>
                <div className="grid grid-cols-7 gap-2 text-center">
                    {weekdayLabels.map((w) => (
                        <div key={w} className="text-sm opacity-70 py-2">
                            周{w}
                        </div>
                    ))}
                    {matrix.map((d, idx) => {
                        const isTarget = d === day;
                        const isHolidayDay = isHoliday(d);

                        return (
                            <div
                                key={idx}
                                className={[
                                    "aspect-square flex items-center justify-center rounded-md text-sm relative",
                                    d === null ? "opacity-30" : "",
                                    isTarget ? "" : // 婚礼当天不添加边框
                                        isHolidayDay ? "bg-red-100 text-red-600 border border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-700" :
                                            "border border-black/[.08] dark:border-white/[.15]",
                                ].join(" ")}
                            >
                                {isTarget ? (
                                    <WeddingDayImage />
                                ) : (
                                    d ?? ""
                                )}
                            </div>
                        );
                    })}
                </div>
                <div className="mt-6 text-center text-sm opacity-80">
                    <div className="flex items-center justify-center gap-4 mb-2">
                        <div className="flex items-center gap-1">
                            <div className="w-3 h-3 bg-red-100 border border-red-200 rounded dark:bg-red-900/30 dark:border-red-700"></div>
                            <span>国庆假期</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <div className="w-3 h-3 rounded relative overflow-hidden">
                                <Image
                                    src={WEDDING_CONFIG.weddingDayImage}
                                    alt="婚礼日"
                                    width={12}
                                    height={12}
                                    className="object-cover"
                                />
                            </div>
                            <span>婚礼日</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
