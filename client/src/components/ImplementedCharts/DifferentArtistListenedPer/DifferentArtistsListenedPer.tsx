import React, { useCallback } from 'react';
import { api } from '../../../services/api';
import { useAPI } from '../../../services/hooks';
import { buildXYData, formatXAxisDateTooltip, useFormatXAxis } from '../../../services/stats';
import { DateId } from '../../../services/types';
import ChartCard from '../../ChartCard';
import Line from '../../charts/Line';
import LoadingImplementedChart from '../LoadingImplementedChart';
import { ImplementedChartProps } from '../types';

interface DifferentArtistsListenedPerProps extends ImplementedChartProps {}

export default function DifferentArtistsListenedPer({
  className,
  interval,
}: DifferentArtistsListenedPerProps) {
  const result = useAPI(api.differentArtistsPer, interval.start, interval.end, interval.timesplit);

  const data = buildXYData(
    result?.map((r) => ({
      _id: r._id as DateId,
      value: r.differents,
    })) ?? [],
    interval.start,
    interval.end,
  );

  const formatX = useFormatXAxis(data, interval.start, interval.end);
  const tooltipValueFormatter = useCallback((value: number) => `${value} different artists`, []);

  if (!result) {
    return <LoadingImplementedChart title="Different artists listened" className={className} />;
  }

  if (result.length > 0 && result[0]._id == null) {
    return null;
  }

  return (
    <ChartCard title="Different artists listened" className={className}>
      <Line
        data={data}
        xFormat={formatX}
        tooltipLabelFormatter={formatXAxisDateTooltip}
        tooltipValueFormatter={tooltipValueFormatter}
      />
    </ChartCard>
  );
}
