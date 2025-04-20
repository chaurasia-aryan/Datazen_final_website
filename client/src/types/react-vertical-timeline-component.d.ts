declare module 'react-vertical-timeline-component' {
  import { ReactNode } from 'react';

  export interface VerticalTimelineElementProps {
    id?: string;
    className?: string;
    date?: string | ReactNode;
    iconStyle?: React.CSSProperties;
    icon?: ReactNode;
    position?: string;
    style?: React.CSSProperties;
    contentStyle?: React.CSSProperties;
    contentArrowStyle?: React.CSSProperties;
    visible?: boolean;
    children?: ReactNode;
  }

  export interface VerticalTimelineProps {
    animate?: boolean;
    className?: string;
    layout?: '1-column' | '2-columns';
    lineColor?: string;
    children?: ReactNode;
  }

  export const VerticalTimeline: React.FC<VerticalTimelineProps>;
  export const VerticalTimelineElement: React.FC<VerticalTimelineElementProps>;
}