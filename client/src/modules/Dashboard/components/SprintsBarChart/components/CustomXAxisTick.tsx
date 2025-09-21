import { Popover } from "@gravity-ui/uikit";
import styles from '../SprintsBarChart.module.scss';

export const CustomXAxisTick = (props: any) => {
    const { x, y, payload } = props;
    return (
      <Popover className={styles.xAxisDotPopover} content={payload.value}>
        <g>
          <circle
            cx={x}
            cy={y}
            r={4}
            fill="#666"
            className={styles.xAxisDot}
          />
        </g>
      </Popover>
    );
  };