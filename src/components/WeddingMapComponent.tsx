"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface MapMarker {
    id: string;
    x: number; // 相对于图片的百分比位置 (0-100)
    y: number; // 相对于图片的百分比位置 (0-100)
    title: string;
    description?: string;
    latitude: number; // 纬度
    longitude: number; // 经度
}

interface NavigationModalProps {
    isOpen: boolean;
    onClose: () => void;
    marker: MapMarker | null;
}

// 导航选择弹窗
function NavigationModal({ isOpen, onClose, marker }: NavigationModalProps) {
    if (!isOpen || !marker) return null;

    const handleNavigation = (type: 'amap' | 'baidu' | 'apple') => {
        const { latitude, longitude, title } = marker;

        let url = '';
        if (type === 'amap') {
            // 高德地图 APP URI - 直接导航
            url = `amapuri://route/plan/?did=&dlat=${latitude}&dlon=${longitude}&dname=${encodeURIComponent(title)}`;
        } else if (type === 'baidu') {
            // 百度地图 APP URI
            url = `baidumap://map/direction?destination=${latitude},${longitude}&name=${encodeURIComponent(title)}&mode=driving&src=webapp.baidu.openAPIdemo`;
        } else if (type === 'apple') {
            // 苹果地图 APP URI
            url = `http://maps.apple.com/?daddr=${latitude},${longitude}&dirflg=d`;
        }

        // 尝试打开APP
        window.open(url, '_blank');

        // 如果APP没有安装，提供备用方案
        setTimeout(() => {
            if (type === 'amap') {
                // 高德地图网页版 - 降级到网页导航
                window.open(`https://uri.amap.com/navigation?to=${longitude},${latitude},${encodeURIComponent(title)}&mode=car&src=myapp`, '_blank');
            } else if (type === 'baidu') {
                // 百度地图网页版
                window.open(`https://api.map.baidu.com/marker?location=${latitude},${longitude}&title=${encodeURIComponent(title)}&content=${encodeURIComponent(title)}&output=html&src=myapp`, '_blank');
            } else if (type === 'apple') {
                // 苹果地图网页版
                window.open(`https://maps.apple.com/?daddr=${latitude},${longitude}&dirflg=d`, '_blank');
            }
        }, 1000);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-sm w-full mx-4">
                <h3 className="text-lg font-semibold mb-2">{marker.title}</h3>
                {marker.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{marker.description}</p>
                )}

                <div className="space-y-3">
                    <button
                        onClick={() => handleNavigation('amap')}
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
                    >
                        <div className="w-5 h-5 bg-white rounded flex items-center justify-center">
                            <span className="text-blue-500 text-xs font-bold">高</span>
                        </div>
                        使用高德地图导航
                    </button>

                    <button
                        onClick={() => handleNavigation('baidu')}
                        className="w-full bg-red-500 hover:bg-red-600 text-white py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
                    >
                        <div className="w-5 h-5 bg-white rounded flex items-center justify-center">
                            <span className="text-red-500 text-xs font-bold">百</span>
                        </div>
                        使用百度地图导航
                    </button>

                    <button
                        onClick={() => handleNavigation('apple')}
                        className="w-full bg-gray-600 hover:bg-gray-700 text-white py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
                    >
                        <div className="w-5 h-5 bg-white rounded flex items-center justify-center">
                            <span className="text-gray-600 text-xs font-bold">🍎</span>
                        </div>
                        使用苹果地图导航
                    </button>
                </div>

                <button
                    onClick={onClose}
                    className="w-full mt-4 py-2 px-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                >
                    取消
                </button>
            </div>
        </div>
    );
}

export default function WeddingMapComponent() {
    const [selectedMarker, setSelectedMarker] = useState<MapMarker | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const imageRef = useRef<HTMLDivElement>(null);
    const [markerPositions, setMarkerPositions] = useState<{ [key: string]: { left: number; top: number } }>({});

    // 地图标记点数据 - 你可以根据实际图片调整位置和坐标
    const markers: MapMarker[] = [
        {
            id: 'EastGate',
            x: 88,
            y: 70,
            title: '黄河迎宾馆东门',
            description: '车辆推荐入口',
            latitude: 34.875314,
            longitude: 113.650306,
        },
        {
            id: 'WestGate',
            x: 15,
            y: 65,
            title: '黄河迎宾馆西门',
            description: '车辆、地铁均可',
            latitude: 34.87184,
            longitude: 113.644634,
        },
        {
            id: 'Restaurant',
            x: 34,
            y: 74,
            title: '10号楼宴会厅',
            description: '婚礼结束后在10号厅就餐',
            latitude: 34.871027,
            longitude: 113.647949,
        },
        {
            id: 'Wedding',
            x: 57,
            y: 25,
            title: '水杉林',
            description: '婚礼举办地',
            latitude: 34.871339,
            longitude: 113.652236,
        }
    ];

    // 计算标记点位置
    useEffect(() => {
        const calculateMarkerPositions = () => {
            if (!imageRef.current) return;

            const container = imageRef.current;
            const containerRect = container.getBoundingClientRect();
            const containerWidth = containerRect.width;
            const containerHeight = containerRect.height;

            const newPositions: { [key: string]: { left: number; top: number } } = {};

            markers.forEach(marker => {
                // 计算相对于容器的实际像素位置
                const left = (marker.x / 100) * containerWidth;
                const top = (marker.y / 100) * containerHeight;

                newPositions[marker.id] = { left, top };
            });

            setMarkerPositions(newPositions);
        };

        // 初始计算
        calculateMarkerPositions();

        // 监听窗口大小变化
        window.addEventListener('resize', calculateMarkerPositions);

        return () => {
            window.removeEventListener('resize', calculateMarkerPositions);
        };
    }, []);

    const handleMarkerClick = (marker: MapMarker) => {
        setSelectedMarker(marker);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedMarker(null);
    };

    return (
        <section className="h-screen w-full snap-start flex items-center justify-center px-4 py-4 bg-gradient-to-br from-green-50/80 via-emerald-50/80 to-green-100/80 dark:from-green-900/20 dark:via-emerald-900/20 dark:to-green-800/20">
            <div className="relative w-full max-w-4xl mx-auto bg-white/90 dark:bg-gray-800/90 rounded-2xl p-6 backdrop-blur-sm shadow-2xl">
                {/* 地图标题 */}
                <div className="text-center mb-6">
                    <h2 className="text-xl md:text-3xl font-bold text-gray-800 dark:text-white mb-2">💒 婚礼场地导航指南</h2>
                    <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 mb-3">点击地图上的📍进行导航</p>
                </div>

                {/* 地图图片 */}
                <div className="relative" ref={imageRef}>
                    <Image
                        src="/wedding-map.jpg"
                        alt="婚礼地图"
                        width={800}
                        height={600}
                        className="w-full h-auto rounded-xl shadow-2xl border-4 border-white dark:border-gray-700"
                        style={{ aspectRatio: '4/3' }}
                    />

                    {/* 标记点 */}
                    {markers.map((marker) => {
                        const position = markerPositions[marker.id];
                        if (!position) return null;

                        return (
                            <button
                                key={marker.id}
                                onClick={() => handleMarkerClick(marker)}
                                className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                                style={{
                                    left: `${position.left}px`,
                                    top: `${position.top}px`
                                }}
                            >
                                {/* 标记图标 */}
                                <div className="w-10 h-10 flex items-center justify-center hover:scale-110 transition-transform">
                                    <span className="text-2xl">📍</span>
                                </div>

                                {/* 悬停提示 */}
                                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                    {marker.title}
                                </div>
                            </button>
                        );
                    })}
                </div>

                {/* 地图描述信息 */}
                <div className="mt-6 bg-gradient-to-r from-pink-50 to-rose-50 dark:from-gray-800 dark:to-gray-700 rounded-lg p-6 border border-pink-200 dark:border-gray-600">
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* 标记点说明 */}
                        <div>
                            <h4 className="text-sm font-semibold text-gray-800 dark:text-white mb-3 flex items-center">
                                <span className="text-base mr-2">📍</span>
                                重要位置标记（点击即可导航）
                            </h4>
                            <ul className="space-y-2 text-xs text-gray-600 dark:text-gray-300">
                                {markers.map((marker) => (
                                    <li key={marker.id} className="flex items-center">
                                        <span
                                            className='w-2 h-2 rounded-full mr-3 bg-blue-500'
                                        ></span>
                                        <button
                                            onClick={() => handleMarkerClick(marker)}
                                            className="text-left hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
                                        >
                                            <strong>{marker.title}</strong> - {marker.description}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* 导航和流程说明 */}
                        <div>
                            <h4 className="text-sm font-semibold text-gray-800 dark:text-white mb-3 flex items-center">
                                <span className="text-base mr-2">🚗</span>
                                婚礼流程
                            </h4>
                            <div className="space-y-3 text-xs text-gray-600 dark:text-gray-300">
                                <div>
                                    <div className="space-y-2 text-xs">
                                        <div className="flex items-center space-x-2">
                                            <span className="text-pink-500">🌸</span>
                                            <span>水杉林婚礼仪式 <span className="text-xs text-gray-500">(11:30)</span></span>
                                        </div>
                                        <div className="flex items-center space-x-12">
                                            <span className="text-pink-500 w-4"></span>
                                            <span className="text-gray-400 text-sm">↓</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <span className="text-orange-500">🍽️</span>
                                            <span>10号宴会厅用餐 <span className="text-xs text-gray-500">(12:30)</span></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 导航选择弹窗 */}
                <NavigationModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    marker={selectedMarker}
                />
            </div>
        </section>
    );
} 