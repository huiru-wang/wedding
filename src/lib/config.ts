export const WEDDING_CONFIG = {
    brideName: "安媛媛",
    groomName: "王荟儒",
    weddingDateTime: "2025-10-07T12:00:00",
    location: {
        lat: 34.88,
        lng: 113.65,
        address: "河南省郑州市黄河迎宾馆 水杉林入口"
    },
    // 不同设备的背景图片
    heroImages: {
        mobile: "/hero-mobile.jpg",    // 移动端背景图
        desktop: "/hero.jpg",          // PC端背景图
        fallback: "/hero.jpg"          // 备用图片
    },
    // 婚礼当天的日历图片
    weddingDayImage: "/wedding-day.png",
    // 时间线数据
    timeline: [
        {
            id: 1,
            date: "2020-03-15",
            title: "初次相遇",
            description: "在大学的图书馆里，我们第一次相遇。那天阳光正好，你正在看一本关于摄影的书。",
            images: ["/timeline/meet1.jpg", "/timeline/meet2.jpg"]
        },
        {
            id: 2,
            date: "2020-06-20",
            title: "第一次约会",
            description: "我们一起去看了电影，然后在一家小咖啡馆里聊了很久。从那时起，我知道你就是我要找的人。",
            images: ["/timeline/date1.jpg"]
        },
        {
            id: 3,
            date: "2021-02-14",
            title: "正式交往",
            description: "情人节那天，我鼓起勇气向你表白。你答应了，我们正式在一起了。",
            images: ["/timeline/together1.jpg", "/timeline/together2.jpg"]
        },
        {
            id: 4,
            date: "2023-08-15",
            title: "求婚成功",
            description: "在海边夕阳下，我单膝跪地向你求婚。你流着眼泪说愿意，那一刻是我人生中最幸福的时刻。",
            images: ["/timeline/propose1.jpg"]
        },
        {
            id: 5,
            date: "2025-10-07",
            title: "婚礼日",
            description: "今天，我们终于要步入婚姻的殿堂。感谢你陪我走过这些美好的时光，未来的路我们一起走。",
            images: ["/timeline/wedding1.jpg", "/timeline/wedding2.jpg"]
        }
    ]
} as const;

export type WeddingConfig = typeof WEDDING_CONFIG;
export type TimelineItem = typeof WEDDING_CONFIG.timeline[0];
