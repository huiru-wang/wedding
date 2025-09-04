"use client";
import { useState } from "react";
import MapComponent from "./MapComponent";
import TravelSidebar from "@/components/TravelSidebar";
import { TravelMarker } from "@/lib/types";
export function TravelContainer({ travelMarkers }: { travelMarkers: TravelMarker[] }) {

    const [showSideBar, setShowSidebar] = useState(false);

    const [selectedMarker, setSelectedMarker] = useState<TravelMarker | null>(null);

    const scrollToTop = () => {
        if (typeof window !== "undefined") {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    return (
        <section className="h-screen w-full snap-start flex flex-col bg-background text-foreground pt-8">
            <div className="px-6 pt-8">
                <h2 className="text-2xl sm:text-3xl font-semibold text-center">旅行足迹</h2>
            </div>
            <div className="relative flex-1 px-4 sm:px-32 pt-4 pb-32">
                <div className="h-full w-full rounded-xl overflow-hidden shadow-lg">
                    {/* 地图实例 */}
                    <MapComponent travelMarkers={travelMarkers} setShowSidebar={setShowSidebar} setSelectedMarker={setSelectedMarker as any} />
                </div>

                {/* 侧边抽屉 */}
                <TravelSidebar open={showSideBar} onClose={() => setShowSidebar(false)} marker={selectedMarker} />
            </div>
        </section>
    );
}
