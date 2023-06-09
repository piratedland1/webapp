<?php

namespace App\Services\Tracks\Queries;

use App\Artist;
use App\Services\Artists\LoadArtist;
use Illuminate\Database\Eloquent\Builder;

class ArtistTrackQuery extends BaseTrackQuery
{
    const ORDER_COL = 'spotify_popularity';

    public function get(int $artistId): Builder
    {
        $artist = app(Artist::class)->find($artistId);

        if ($artist && $artist->needsUpdating()) {
            app(LoadArtist::class)->updateArtistFromExternal($artist);
        }

        return $this->baseQuery()
            ->join('artist_track', 'tracks.id', '=', 'artist_track.track_id')
            ->where('artist_track.artist_id', $artistId)
            ->select('tracks.*');
    }
}
