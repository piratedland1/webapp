import React, {Fragment, ReactNode} from 'react';
import {LikeButton} from '@app/web-player/library/like-button';
import {RepostButton} from '@app/web-player/reposts/repost-button';
import {DialogTrigger} from '@common/ui/overlays/dialog/dialog-trigger';
import {Button} from '@common/ui/buttons/button';
import {ShareIcon} from '@common/icons/material/Share';
import {Trans} from '@common/i18n/trans';
import {MoreHorizIcon} from '@common/icons/material/MoreHoriz';
import {TrackContextDialog} from '@app/web-player/tracks/context-dialog/track-context-dialog';
import {MediaItemStats} from '@app/web-player/tracks/media-item-stats';
import {Track} from '@app/web-player/tracks/track';
import {Album} from '@app/web-player/albums/album';
import {AlbumContextDialog} from '@app/web-player/albums/album-context-dialog';
import clsx from 'clsx';
import {ButtonSize} from '@common/ui/buttons/button-size';
import {useIsMobileMediaQuery} from '@common/utils/hooks/is-mobile-media-query';
import {ShareMediaDialog} from '@app/web-player/sharing/share-media-dialog';

interface Props {
  item: Track | Album;
  managesItem: boolean;
  buttonClassName?: string;
  buttonGap?: string;
  buttonSize?: ButtonSize;
  buttonRadius?: string;
  children?: ReactNode;
  className?: string;
}
export function TrackActionsBar({
  item,
  managesItem,
  buttonClassName,
  buttonGap = 'mr-8',
  buttonSize = 'xs',
  buttonRadius = 'rounded',
  children,
  className,
}: Props) {
  const isMobile = useIsMobileMediaQuery();
  return (
    <div
      className={clsx(
        'flex items-center gap-24 justify-center md:justify-between overflow-hidden @container',
        className
      )}
    >
      <div>
        {children}
        {!isMobile && (
          <Fragment>
            <LikeButton
              size={buttonSize}
              likeable={item}
              className={clsx(buttonGap, buttonClassName)}
              radius={buttonRadius}
              disabled={managesItem}
            />
            <RepostButton
              item={item}
              size={buttonSize}
              radius={buttonRadius}
              disabled={managesItem}
              className={clsx(
                buttonGap,
                buttonClassName,
                'hidden @[840px]:inline-flex'
              )}
            />
          </Fragment>
        )}
        {!isMobile && (
          <DialogTrigger type="modal">
            <Button
              size={buttonSize}
              variant="outline"
              startIcon={<ShareIcon />}
              className={clsx(
                buttonGap,
                buttonClassName,
                'hidden @[660px]:inline-flex'
              )}
              radius={buttonRadius}
            >
              <Trans message="Share" />
            </Button>
            <ShareMediaDialog item={item} />
          </DialogTrigger>
        )}
        <DialogTrigger type="popover">
          <Button
            variant="outline"
            size={buttonSize}
            startIcon={<MoreHorizIcon />}
            className={clsx(buttonGap, buttonClassName)}
            radius={buttonRadius}
          >
            <Trans message="More" />
          </Button>
          <MoreDialog item={item} />
        </DialogTrigger>
      </div>
      {!isMobile && <MediaItemStats item={item} />}
    </div>
  );
}

interface MoreDialogProps {
  item: Track | Album;
}
function MoreDialog({item}: MoreDialogProps) {
  if (item.model_type === 'track') {
    return <TrackContextDialog tracks={[item]} />;
  }
  return <AlbumContextDialog album={item} />;
}
