import { CategoryReportResponseDto, SprintReportResponseDto } from "@generated";
import React, { MouseEventHandler } from "react";

export interface BarChartProps {
    data: SprintReportResponseDto[];
    onClick?: MouseEventHandler<HTMLCanvasElement>;
    onSprintSelect?: (sprintId: number) => void;
    selectedSprintId?: number;
    selectedCategoryId?: number;
    categories?: CategoryReportResponseDto[];
}

export type BarChartData = {
    sprintId: number;
    name: string;
    amount: number;
    fill: string;
}

// Типы для событий Bar компонента
export type BarRectangleItem = {
    value: number | [number, number];
    x: number;
    y: number;
    width: number;
    height: number;
    payload?: BarChartData;
    tooltipPosition: { x: number; y: number };
}

export type BarClickEvent = (data: BarRectangleItem, index: number, event: React.MouseEvent<SVGPathElement, MouseEvent>) => void;

// Типы для Tooltip
export type TooltipPayload = {
    value: number;
    name: string;
    payload: BarChartData;
    fill: string;
    dataKey: string;
}

export type TooltipContentProps = {
    active?: boolean;
    payload?: TooltipPayload[];
    label?: string;
    coordinate?: { x: number; y: number };
}
