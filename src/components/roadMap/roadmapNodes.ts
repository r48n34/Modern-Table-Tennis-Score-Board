import {
    Position,
} from '@xyflow/react';

export const roadMapNodes = [
    {
        id: "grips",
        position: { x: 0, y: 20 },
        data: { label: "握法 Grips" },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
    },
    {
        id: "grips-shakehand",
        position: { x: 200, y: 0 },
        data: { label: "橫拍 Shakehand" },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
    },
    {
        id: "grips-penhold",
        position: { x: 200, y: 50 },
        data: { label: "直板 Penhold" },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
    },
    {
        id: "Training-Map",
        position: { x: 100, y: 200 },
        data: { label: "Training Map" },
    },
    {
        id: "Basic",
        position: { x: 100, y: 320 },
        data: { label: "Basic Skills (Top Spin)" },
    },
    {
        id: "Forehand-Drive-One",
        position: { x: 300, y: 280 },
        data: { label: "Forehand Drive (One Position)" },
        style: {
            width: 200,
        },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
    },
    {
        id: "Backhand-Drive-One",
        position: { x: 300, y: 360 },
        data: { label: "Backhand Drive (One Position)" },
        style: {
            width: 200,
        },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
    },
    {
        id: "Basic-Serve",
        position: { x: 550, y: 320 },
        data: { label: "Serve (Either One)" },
        style: {
            width: 160,
        },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
    },
    {
        id: "Serve-forehand",
        position: { x: 760, y: 280 },
        data: { label: "Forehand serve (Any Position)" },
        style: {
            width: 200,
        },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
    },
    {
        id: "Serve-backhand",
        position: { x: 760, y: 360 },
        data: { label: "Backhand serve (Any Position)" },
        style: {
            width: 200,
        },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
    },
    {
        id: "Basic-Enhancement",
        position: { x: 100, y: 540 },
        data: { label: "Basic Enhancement" },
    },
    {
        id: "Forehand-Loop-Two",
        position: { x: 300, y: 480 },
        data: { label: "Forehand Loop (Left | Right)" },
        style: {
            width: 200,
        },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
    },
    {
        id: "Backhand-Loop-Two",
        position: { x: 300, y: 540 },
        data: { label: "Backhand Loop (Left | Right)" },
        style: {
            width: 200,
        },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
    },
    {
        id: "Mix-Loop-Two",
        position: { x: 300, y: 600 },
        data: { label: "Mix Loop (Forehand & Backhand)" },
        style: {
            width: 200,
        },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
    },
    {
        id: "Long / Short Serve",
        position: { x: 520, y: 480 },
        data: { label: "Long & Short Serve (Any method)" },
        style: {
            width: 230,
        },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
    },
    {
        id: "Forehand-Loop-Three",
        position: { x: 520, y: 540 },
        data: { label: "Forehand Loop (Left | Middle | Right)" },
        style: {
            width: 230,
        },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
    },
    {
        id: "Backhand-Loop-Three",
        position: { x: 520, y: 600 },
        data: { label: "Backhand Loop (Left | Middle | Right)" },
        style: {
            width: 230,
        },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
    },
    {
        id: "Mixed-Loop-Three",
        position: { x: 770, y: 480 },
        data: { label: "Mix Loop (Left | Middle | Right)" },
        style: {
            width: 230,
        },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
    },
    {
        id: "Basic-Side",
        position: { x: 100, y: 760 },
        data: { label: "Basic Skills (Side Spin)" },
    },
    {
        id: "Basic-Side-Backhand",
        position: { x: 300, y: 720 },
        data: { label: "Backhand Tackle Side Spin" },
        style: {
            width: 200,
        },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
    },
    {
        id: "Forehand-Side-Backhand",
        position: { x: 300, y: 810 },
        data: { label: "Forehand Tackle Side Spin" },
        style: {
            width: 200,
        },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
    },
    {
        id: "Basic-Serve-Side",
        position: { x: 550, y: 760 },
        data: { label: "Serve (Either One)" },
        style: {
            width: 160,
        },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
    },
    {
        id: "Serve-Forehand-Side",
        position: { x: 760, y: 720 },
        data: { label: "Forehand Side Serve (Any Position)" },
        style: {
            width: 260,
        },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
    },
    {
        id: "Serve-Backhand-Side",
        position: { x: 760, y: 810 },
        data: { label: "Backhand Side Serve (Any Position)" },
        style: {
            width: 260,
        },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
    },
];

export const roadMapEdges = [
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
        id: "e1-3",
        source: "Forehand-Drive-One",
        target: "Basic-Serve",
    },
    {
        id: "e1-4",
        source: "Backhand-Drive-One",
        target: "Basic-Serve",
    },
];
