"use client";

import { useEffect, useMemo, useState } from "react";
import { WEDDING_CONFIG } from "@/lib/config";

function formatTimeDelta(msRemaining: number) {
    if (msRemaining <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    const totalSeconds = Math.floor(msRemaining / 1000);
    const days = Math.floor(totalSeconds / (24 * 3600));
    const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return { days, hours, minutes, seconds };
}

export default function CountdownHero() {
    const targetTime = useMemo(() => new Date(WEDDING_CONFIG.weddingDateTime).getTime(), []);
    const [now, setNow] = useState<number>(() => Date.now());

    useEffect(() => {
        const id = setInterval(() => setNow(Date.now()), 1000);
        return () => clearInterval(id);
    }, []);

    const delta = useMemo(() => formatTimeDelta(targetTime - now), [targetTime, now]);

    return (
        <section className="relative h-screen w-full snap-start overflow-hidden">
            {/* 背景图片 - 使用CSS媒体查询实现响应式 */}
            <div className="absolute inset-0">
                {/* 移动端背景图 */}
                <div
                    className="absolute inset-0 bg-center bg-cover sm:hidden"
                    style={{
                        backgroundImage: `url(${WEDDING_CONFIG.heroImages.mobile})`,
                        zIndex: 1
                    }}
                />
                {/* PC端背景图 */}
                <div
                    className="absolute inset-0 bg-center bg-cover hidden sm:block"
                    style={{
                        backgroundImage: `url(${WEDDING_CONFIG.heroImages.desktop})`,
                        zIndex: 1
                    }}
                />
                {/* 备用背景图 - 确保始终有背景 */}
                <div
                    className="absolute inset-0 bg-center bg-cover"
                    style={{
                        backgroundImage: `url(${WEDDING_CONFIG.heroImages.fallback})`,
                        zIndex: 0
                    }}
                />
            </div>

            {/* 遮罩渐变 */}
            <div className="absolute inset-0 bg-black/30 z-10" />

            {/* 内容 - 调整位置往上移动 */}
            <div className="relative z-20 h-full w-full flex flex-col items-center justify-start text-center text-white px-6 pt-20 sm:pt-24 md:pt-32">
                <div className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-wide">
                    {WEDDING_CONFIG.groomName} &️ {WEDDING_CONFIG.brideName}
                </div>
                <div className="mt-3 text-sm sm:text-base opacity-90">
                    婚礼倒计时
                </div>
                <div className="mt-8 flex items-center justify-center gap-2 sm:gap-6">
                    <TimeBox label="天" value={delta.days} />
                    <Separator />
                    <TimeBox label="时" value={delta.hours} />
                    <Separator />
                    <TimeBox label="分" value={delta.minutes} />
                    <Separator />
                    <TimeBox label="秒" value={delta.seconds} />
                </div>
            </div>

            {/* 底部提示 */}
            <div className="absolute bottom-6 left-0 right-0 flex justify-center text-white/80 text-xs z-20">
                上滑继续浏览
            </div>
        </section>
    );
}

function TimeBox({ label, value }: { label: string; value: number }) {
    const padded = value.toString().padStart(2, "0");
    return (
        <div className="flex flex-col items-center">
            <div className="w-16 sm:w-20 px-3 py-2 rounded-md bg-white/15 backdrop-blur text-2xl sm:text-3xl font-bold text-center">
                {padded}
            </div>
            <div className="mt-1 text-xs opacity-90">{label}</div>
        </div>
    );
}

function Separator() {
    return <div className="text-2xl sm:text-3xl opacity-70">:</div>;
}
