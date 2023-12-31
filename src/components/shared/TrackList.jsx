import { TrackCard } from "./TrackCard"

export const TrackList = ({ trackList }) => {
    return (
        <section className="grid gap-3">
            {
                trackList.map((track) => (
                    <TrackCard key={track.id} track={track} />
                ) )        
                
            }
        </section>
    )
}