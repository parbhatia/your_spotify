import React, { useCallback, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Header from '../../../components/Header';
import { IntervalDetail, intervals } from '../../../components/IntervalSelector/IntervalSelector';
import Loader from '../../../components/Loader';
import TitleCard from '../../../components/TitleCard';
import { api } from '../../../services/api';
import { UnboxPromise } from '../../../services/types';
import Artist from './Artist';
import s from './index.module.css';

export default function Artists() {
  const [interval, setInterval] = useState(intervals[0]);
  const [items, setItems] = useState<
    UnboxPromise<ReturnType<typeof api['getBestArtists']>>['data']
  >([]);
  const [hasMore, setHasMore] = useState(true);

  const fetch = useCallback(async () => {
    if (!hasMore) return;
    try {
      const result = await api.getBestArtists(
        interval.interval.start,
        interval.interval.end,
        10,
        items.length,
      );
      setItems([...items, ...result.data]);
      setHasMore(result.data.length === 10);
    } catch (e) {
      console.error(e);
    }
  }, [hasMore, interval, items]);

  useEffect(() => {
    if (items.length === 0) {
      fetch();
    }
    // Initial fetch
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [interval, items.length]);

  const changeInterval = useCallback((newInterval: IntervalDetail) => {
    setInterval(newInterval);
    setItems([]);
    setHasMore(true);
  }, []);

  return (
    <div>
      <Header
        title="Top artists"
        subtitle="Here are the artists you listened to the most"
        interval={interval}
        onChange={changeInterval}
      />
      <div className={s.content}>
        <TitleCard title="Top artists">
          <Artist line />
          <InfiniteScroll
            next={fetch}
            hasMore={hasMore}
            dataLength={items.length}
            loader={<Loader />}>
            {items.map((item) => (
              <Artist
                key={item.artist.id}
                artist={item.artist}
                count={item.count}
                totalCount={item.total_count}
                duration={item.duration_ms}
                totalDuration={item.total_duration_ms}
              />
            ))}
          </InfiniteScroll>
        </TitleCard>
      </div>
    </div>
  );
}
