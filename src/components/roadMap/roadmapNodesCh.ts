import {
    Position,
} from '@xyflow/react';

export const roadMapNodesCh = [
    {
        id: "Training-Map",
        position: { x: 100, y: 200 },
        data: { label: "訓練地圖" },
    },
    {
        id: "Basic",
        position: { x: 100, y: 320 },
        data: { label: "基本技能（上旋）" },
    },
    {
        id: "Forehand-Drive-One",
        position: { x: 300, y: 280 },
        data: { label: "正手攻球（單一位置）" },
        style: {
            width: 200,
        },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
    },
    {
        id: "Backhand-Drive-One",
        position: { x: 300, y: 360 },
        data: { label: "反手攻球（單一位置）" },
        style: {
            width: 200,
        },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
    },
    {
        id: "Basic-Serve",
        position: { x: 550, y: 320 },
        data: { label: "發球（任意一種）" },
        style: {
            width: 160,
        },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
    },
    {
        id: "Serve-forehand",
        position: { x: 760, y: 280 },
        data: { label: "正手發球（任意位置）" },
        style: {
            width: 200,
        },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
    },
    {
        id: "Serve-backhand",
        position: { x: 760, y: 360 },
        data: { label: "反手發球（任意位置）" },
        style: {
            width: 200,
        },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
    },
    {
        id: "Basic-Enhancement",
        position: { x: 100, y: 540 },
        data: { label: "基本加強" },
    },
    {
        id: "Forehand-Loop-Two",
        position: { x: 300, y: 480 },
        data: { label: "正手攻球（左 | 右）" },
        style: {
            width: 200,
        },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
    },
    {
        id: "Backhand-Loop-Two",
        position: { x: 300, y: 540 },
        data: { label: "反手攻球（左 | 右）" },
        style: {
            width: 200,
        },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
    },
    {
        id: "Mix-Loop-Two",
        position: { x: 300, y: 600 },
        data: { label: "混合攻球（正手 & 反手 左右）" },
        style: {
            width: 200,
        },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
    },
    {
        id: "Long / Short Serve",
        position: { x: 520, y: 480 },
        data: { label: "長短發球（任意方法）" },
        style: {
            width: 230,
        },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
    },
    {
        id: "Forehand-Loop-Three",
        position: { x: 520, y: 540 },
        data: { label: "正手攻球（左 | 中 | 右）" },
        style: {
            width: 230,
        },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
    },
    {
        id: "Backhand-Loop-Three",
        position: { x: 520, y: 600 },
        data: { label: "反手攻球（左 | 中 | 右）" },
        style: {
            width: 230,
        },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
    },
    {
        id: "Mixed-Loop-Three",
        position: { x: 770, y: 480 },
        data: { label: "混合攻球（左反 | 中正 | 右正）" },
        style: {
            width: 230,
        },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
    },
    {
        id: "Forehand-Force",
        position: { x: 770, y: 540 },
        data: { label: "正手(近中卓)攻球" },
        style: {
            width: 230,
        },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
    },
    {
        id: "Backhand-Force",
        position: { x: 770, y: 600 },
        data: { label: "反手(近中卓)攻球" },
        style: {
            width: 230,
        },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
    },
    {
        id: "Basic-Side",
        position: { x: 100, y: 760 },
        data: { label: "基本技能（側旋）" },
    },
    {
        id: "Basic-Side-Backhand",
        position: { x: 300, y: 720 },
        data: { label: "反手 (近卓) 防守/推擋" },
        style: {
            width: 200,
        },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
    },
    {
        id: "Forehand-Side-Backhand",
        position: { x: 300, y: 810 },
        data: { label: "正手 (近卓) 防守/推擋" },
        style: {
            width: 200,
        },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
    },
    {
        id: "Basic-Serve-Side",
        position: { x: 550, y: 760 },
        data: { label: "發球（任意一種）" },
        style: {
            width: 160,
        },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
    },
    {
        id: "Serve-Forehand-Side",
        position: { x: 760, y: 720 },
        data: { label: "正手側旋發球（任意位置）" },
        style: {
            width: 260,
        },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
    },
    {
        id: "Serve-Backhand-Side",
        position: { x: 760, y: 810 },
        data: { label: "反手側旋發球（任意位置）" },
        style: {
            width: 260,
        },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
    },

    {
        id: "Basic-Back",
        position: { x: 100, y: 970 },
        data: { label: "基本技能（下旋）" },
    },
    {
        id: "Basic-Back-Backhand",
        position: { x: 300, y: 920 },
        data: { label: "反手 (短台/長台) 推擋" },
        style: {
            width: 200,
        },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
    },
    {
        id: "Basic-Back-Forehand",
        position: { x: 300, y: 1020 },
        data: { label: "正手 (短台/長台) 推擋" },
        style: {
            width: 200,
        },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
    },
    {
        id: "Basic-Back-Forehand-Up",
        position: { x: 550, y: 970 },
        data: { label: "正手拉上旋 (中長台)" },
        style: {
            width: 160,
        },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
    },

    {
        id: "Basic-Serve-Back",
        position: { x: 760, y: 970 },
        data: { label: "發球（任意一種）" },
        style: {
            width: 160,
        },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
    },
    {
        id: "Serve-Forehand-Back",
        position: { x: 960, y: 920 },
        data: { label: "正手下旋發球（任意位置）" },
        style: {
            width: 260,
        },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
    },
    {
        id: "Serve-Backhand-Back",
        position: { x: 960, y: 1020 },
        data: { label: "反手下旋發球（任意位置）" },
        style: {
            width: 260,
        },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
    },

    {
        id: "Basic-Tactics",
        position: { x: 100, y: 1200 },
        data: { label: "基本戰術" },
    },
    {
        id: "4-Points-Serve",
        position: { x: 300, y: 1140 },
        data: { label: "四點發球（左 | 右 | 近 | 遠）" },
        style: {
            width: 260,
        },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
    },
    {
        id: "Serve-And-Play",
        position: { x: 300, y: 1200 },
        data: { label: "發球與接球（關於旋轉）" },
        style: {
            width: 260,
        },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
    },
    {
        id: "Position-And-Footwork",
        position: { x: 300, y: 1260 },
        data: { label: "位置與步法站位" },
        style: {
            width: 260,
        },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
    },
    {
        id: "Serve-And-Attack",
        position: { x: 600, y: 1140 },
        data: { label: "發球與攻擊（前三板）" },
        style: {
            width: 260,
        },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
    },
    {
        id: "Lob-And-smash",
        position: { x: 600, y: 1200 },
        data: { label: "挑高球與扣殺" },
        style: {
            width: 260,
        },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
    },
    {
        id: "Identify-Opponents-Serve",
        position: { x: 600, y: 1260 },
        data: { label: "辨別對手發球（上旋/側旋/下旋）" },
        style: {
            width: 260,
        },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
    },
    {
        id: "Random-Position-Attack",
        position: { x: 900, y: 1140 },
        data: { label: "隨機位置攻擊與防禦" },
        style: {
            width: 260,
        },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
    },
    {
        id: "Defence-And-Blocking",
        position: { x: 900, y: 1200 },
        data: { label: "防守與封堵" },
        style: {
            width: 260,
        },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
    },

    {
        id: "Advance-Skills",
        position: { x: 100, y: 1440 },
        data: { label: "進階技能" },
    },
    {
        id: "Advance-Skills-Backhand-Drive",
        position: { x: 300, y: 1400 },
        data: { label: "反手拉下旋" },
        style: {
            width: 260,
        },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
    },
    {
        id: "Advance-Skills-Fronthand-Drive",
        position: { x: 300, y: 1460 },
        data: { label: "正手(半出台)拉下旋" },
        style: {
            width: 260,
        },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
    },
    {
        id: "Advance-Skills-Backhand-Flick",
        position: { x: 600, y: 1400 },
        data: { label: "反手擰拉 / 撕" },
        style: {
            width: 260,
        },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
    },
    {
        id: "Advance-Skills-Frontend-Flick",
        position: { x: 600, y: 1460 },
        data: { label: "正手撇" },
        style: {
            width: 260,
        },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
    },
];


export const roadMapEdgesCh = [
    {
        id: "e1-1",
        source: "grips",
        target: "grips-shakehand",
    },
    {
        id: "e1-2",
        source: "Training-Map",
        target: "Basic",
    },
    {
        id: "e1-220",
        source: "Basic",
        target: "Basic-Enhancement",
    },
    {
        id: "e1-221",
        source: "Basic-Enhancement",
        target: "Basic-Side",
    },
    {
        id: "e1-222",
        source: "Basic-Side",
        target: "Basic-Back",
    },
    {
        id: "e1-223",
        source: "Basic-Back",
        target: "Basic-Tactics",
    },
    {
        id: "e1-224",
        source: "Basic-Tactics",
        target: "Advance-Skills",
    },



    // {
    //     id: "e1-3",
    //     source: "Forehand-Drive-One",
    //     target: "Basic-Serve",
    // },
    // {
    //     id: "e1-4",
    //     source: "Backhand-Drive-One",
    //     target: "Basic-Serve",
    // },
];
