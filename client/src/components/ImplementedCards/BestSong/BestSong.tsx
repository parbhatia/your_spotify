import { Skeleton } from '@mui/material';
import clsx from 'clsx';
import React from 'react';
import { api } from '../../../services/api';
import { useAPI } from '../../../services/hooks';
import { msToMinutes } from '../../../services/stats';
import { getImage } from '../../../services/tools';
import TitleCard from '../../TitleCard';
import { ImplementedCardProps } from '../types';
import s from './index.module.css';

interface BestSongProps extends ImplementedCardProps {}

export default function BestSong({ className, interval }: BestSongProps) {
  const result = useAPI(api.getBestSongs, interval.start, interval.end, 1, 0);

  if (!result) {
    return (
      <TitleCard title="Best song" className={clsx(s.root, className)}>
        <div className={s.container}>
          <div className={s.imgcontainer}>
            <Skeleton className={clsx(s.image, s.skeleton)} variant="rectangular" height="100%" />
          </div>
          <div className={s.stats}>
            <Skeleton width="40%" />
            <div className={s.statnumbers}>
              <span className={s.stat}>
                <Skeleton width="60%" />
              </span>
              <span className={s.stat}>
                <Skeleton width="50%" />
              </span>
            </div>
          </div>
        </div>
      </TitleCard>
    );
  }

  if (result.length === 0) {
    return null;
  }

  return (
    <TitleCard title="Best song" className={clsx(s.root, className)}>
      <div className={s.container}>
        <div className={s.imgcontainer}>
          <img className={s.image} src={getImage(result[0].album)} alt="Your best song" />
        </div>
        <div className={s.stats}>
          <strong>{result[0].track.name}</strong>
          <div className={s.statnumbers}>
            <span className={s.stat}>
              <strong>{result[0].count}</strong> times listened
            </span>
            <span className={s.stat}>
              <strong>{msToMinutes(result[0].duration_ms)}</strong> minutes listened
            </span>
          </div>
        </div>
      </div>
    </TitleCard>
  );
}