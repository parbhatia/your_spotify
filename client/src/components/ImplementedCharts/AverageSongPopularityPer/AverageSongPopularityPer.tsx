import React from 'react';
import { api } from '../../../services/api';
import { useAPI } from '../../../services/hooks';
import { buildXYData, formatXAxisDateTooltip, useFormatXAxis } from '../../../services/stats';
import { DateId } from '../../../services/types';
import ChartCard from '../../ChartCard';
import Line from '../../charts/Line';
import LoadingImplementedChart from '../LoadingImplementedChart';
import { ImplementedChartProps } from '../types';

interface AverageSongPopularityPerProps extends ImplementedChartProps {}

export default function AverageSongPopularityPer({
  className,
  interval,
}: AverageSongPopularityPerProps) {
  const result = useAPI(api.popularityPer, interval.start, interval.end, interval.timesplit);

  const data = buildXYData(
    result?.map((r) => ({
      _id: r._id as DateId,
      value: Math.floor(r.totalPopularity * 100) / 100,
    })) ?? [],
    interval.start,
    interval.end,
  );

  const formatX = useFormatXAxis(data, interval.start, interval.end);

  if (!result) {
    return <LoadingImplementedChart title="Average song popularity" className={className} />;
  }

  if (result.length > 0 && result[0]._id == null) {
    return null;
  }

  return (
    <ChartCard title="Average song popularity" className={className}>
      <Line data={data} xFormat={formatX} tooltipLabelFormatter={formatXAxisDateTooltip} />
    </ChartCard>
  );
}
