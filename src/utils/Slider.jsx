import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"

const Slider = ({artistData}) => {
  const [sliderRef] = useKeenSlider({
    mode: "free-snap",
    slides: {
      perView: 3,
      spacing: 15,
    },


  })
  return (
    <div>
      <div ref={sliderRef} className="keen-slider">
        {artistData.albums.map((album) => (
          <div className="keen-slider__slide w-[132px] flex flex-col justify-center rounded" key={album.id}>
            <img className='size-[123px] rounded-[16px]' src={album.images[0].url} alt="" />
            <p className='text-[12px] font-semibold truncate'> {album.name} </p>
            <p className='text-[11px] text-white/60 truncate'> {album.artists[0].name} </p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Slider;
