import { formatAmount } from "@system/utils/formatAmount";
import { TooltipContentProps } from "../types";
import styles from '../SprintsBarChart.module.scss'

export const CustomTooltip = (data: TooltipContentProps) => {
    const { active, payload, label } = data
    if (active && payload && payload.length) {
        return (
            <div
                className={styles.tooltip}
            >
                <p className={styles.tooltipTitle}>{label}</p>
                <p style={{ color: payload[0].payload.fill }} className={styles.tooltipContent}>
                    {formatAmount(payload[0].value)}
                </p>
            </div>
        );
    }
    return null;
};