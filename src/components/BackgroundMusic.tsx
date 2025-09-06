"use client";
import { useState, useEffect, useRef } from 'react';

export default function BackgroundMusic() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [volume, setVolume] = useState(0.8); // 默认音量80%
    const [hasError, setHasError] = useState(false);
    const [showControls, setShowControls] = useState(false);
    const [hasUserInteracted, setHasUserInteracted] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    // 音乐文件路径和名称
    const musicSrc = '/千与千寻-陶笛.mp3';
    const musicName = '千与千寻';

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        // 设置音频属性
        audio.loop = true;
        audio.volume = volume;
        audio.muted = isMuted;

        // 监听音频事件
        const handlePlay = () => setIsPlaying(true);
        const handlePause = () => setIsPlaying(false);
        const handleEnded = () => setIsPlaying(false);
        const handleError = () => {
            setHasError(true);
            setIsPlaying(false);
        };

        audio.addEventListener('play', handlePlay);
        audio.addEventListener('pause', handlePause);
        audio.addEventListener('ended', handleEnded);
        audio.addEventListener('error', handleError);

        return () => {
            audio.removeEventListener('play', handlePlay);
            audio.removeEventListener('pause', handlePause);
            audio.removeEventListener('ended', handleEnded);
            audio.removeEventListener('error', handleError);
        };
    }, [volume, isMuted]);


    // 自动播放音乐（需要用户交互）
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio || hasError || hasUserInteracted) return;

        const autoPlay = async () => {
            try {
                // 立即尝试播放
                await audio.play();
                setHasUserInteracted(true);
                console.log('自动播放成功');
            } catch (error) {
                console.log('自动播放被阻止，需要用户交互', error);
            }
        };

        // 页面加载完成后立即尝试播放
        if (document.readyState === 'complete') {
            autoPlay();
        } else {
            window.addEventListener('load', autoPlay, { once: true });
        }
    }, [hasError, hasUserInteracted]);

    // 监听用户交互事件，尝试自动播放
    useEffect(() => {
        if (hasUserInteracted || hasError) return;

        const tryPlayOnInteraction = async () => {
            const audio = audioRef.current;
            if (!audio) return;

            try {
                await audio.play();
                setHasUserInteracted(true);
            } catch (error) {
                console.log('用户交互后播放仍然被阻止', error);
            }
        };

        // 监听各种用户交互事件
        const events = ['click', 'touchstart', 'keydown', 'scroll'];

        const handleUserInteraction = (event: Event) => {
            // 避免在音乐控制面板上的点击触发自动播放
            if (event.target && (event.target as Element).closest('.music-controls')) {
                return;
            }

            tryPlayOnInteraction();
            // 移除所有事件监听器
            events.forEach(eventType => {
                document.removeEventListener(eventType, handleUserInteraction);
            });
        };

        events.forEach(event => {
            document.addEventListener(event, handleUserInteraction, { once: true, passive: true });
        });

        return () => {
            events.forEach(event => {
                document.removeEventListener(event, handleUserInteraction);
            });
        };
    }, [hasUserInteracted, hasError]);

    // 点击外部关闭控制面板
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Element;
            if (showControls && !target.closest('.music-controls')) {
                setShowControls(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showControls]);

    const togglePlay = async () => {
        const audio = audioRef.current;
        if (!audio) return;

        try {
            if (isPlaying) {
                audio.pause();
            } else {
                await audio.play();
                setHasUserInteracted(true);
            }
        } catch (error) {
            console.error('音频播放失败:', error);
        }
    };

    const toggleMute = () => {
        const audio = audioRef.current;
        if (!audio) return;

        const newMuted = !isMuted;
        audio.muted = newMuted;
        setIsMuted(newMuted);
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        if (audioRef.current) {
            audioRef.current.volume = newVolume;
        }
    };

    return (
        <>
            {/* 音频元素 */}
            <audio ref={audioRef} preload="metadata">
                <source src={musicSrc} type="audio/mpeg" />
                您的浏览器不支持音频播放。
            </audio>

            {/* 音乐控制面板 */}
            <div className="fixed bottom-8 left-8 z-50">
                {/* 简约音乐控制面板 */}
                <div className="relative music-controls">
                    {/* 主控制按钮 */}
                    <button
                        onClick={() => setShowControls(!showControls)}
                        className="w-12 h-12 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl flex items-center justify-center group relative border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300"
                        aria-label="音乐控制"
                    >
                        <svg className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                        </svg>

                        {/* 播放状态指示器 */}
                        {!hasUserInteracted && !hasError && (
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-pink-500 rounded-full flex items-center justify-center animate-pulse">
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                            </div>
                        )}

                        {/* 播放中指示器 */}
                        {isPlaying && hasUserInteracted && (
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                            </div>
                        )}
                    </button>

                    {/* 简化的控制面板 */}
                    {showControls && (
                        <div className="absolute bottom-16 left-0 bg-white dark:bg-gray-800 rounded-xl p-3 shadow-xl border border-gray-200 dark:border-gray-700 min-w-64">

                            {/* 歌曲名 */}
                            <div className="mb-3 text-center">
                                <h3 className="text-sm font-medium text-gray-800 dark:text-white truncate">
                                    {musicName}
                                </h3>
                            </div>

                            {/* 播放控制和音量控制 */}
                            <div className="flex items-center space-x-3">
                                {/* 播放按钮 */}
                                <button
                                    onClick={togglePlay}
                                    className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 flex items-center justify-center transition-colors duration-200 flex-shrink-0"
                                    aria-label={isPlaying ? '暂停音乐' : '播放音乐'}
                                >
                                    {isPlaying ? (
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                                        </svg>
                                    ) : (
                                        <svg className="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                    )}
                                </button>

                                {/* 音量控制 */}
                                <div className="flex items-center space-x-2 flex-1">
                                    <svg className="w-3 h-3 text-gray-500 dark:text-gray-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                                    </svg>
                                    <input
                                        type="range"
                                        min="0"
                                        max="1"
                                        step="0.1"
                                        value={volume}
                                        onChange={handleVolumeChange}
                                        className="flex-1 h-1 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
                                        aria-label="音量控制"
                                    />
                                    <span className="text-xs text-gray-500 dark:text-gray-400 w-8 text-right flex-shrink-0">
                                        {Math.round(volume * 100)}%
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
