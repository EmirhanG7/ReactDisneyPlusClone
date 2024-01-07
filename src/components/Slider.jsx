import { useEffect, useState, useRef } from "react"
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";


export default function Slider() {
    const [movieList, setMovieList] = useState([])
    const elementRef = useRef();
    const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";
    const screenWidth = window.innerWidth;


    useEffect(() => {
        async function fetchData() {
            const request = await fetch("https://api.themoviedb.org/3/trending/all/day?api_key=2ec0d66f5bdf1dd12eefa0723f1479cf");
            let data;
            if(request.ok) {
                data = await request.json();
                setMovieList(data.results);
            } else {
                alert('sayfa yüklenirken bir hata oluştu.')
            }
        }
        fetchData();
    }, [])
    
    console.log(movieList)

    const sliderRight = (e) => {
        e.scrollLeft += screenWidth - 110;
    } 
    const sliderLeft = (e) => {
        e.scrollLeft -= screenWidth - 110;
    } 

    return (
        <div>
            <HiChevronLeft className="hidden md:block text-white text-[30px] absolute mx-8 mt-[150px] cursor-pointer" onClick={() => sliderLeft(elementRef.current)} />
            <HiChevronRight className="hidden md:block text-white text-[30px] absolute mx-8 mt-[150px] cursor-pointer right-0" onClick={() => sliderRight(elementRef.current)}/>
        
            <div className="flex overflow-x-auto w-full px-16 py-4 scrollbar-none scroll-smooth" ref={elementRef}>
                {
                    movieList.map((item, index) => (
                        <img src={IMAGE_BASE_URL+item.backdrop_path}
                        className="min-w-full md:h-[310px] object-cover object-left-top mr-5 rounded-md 
                        hover:border-[4px] border-gray-400 transition-all duration-100 ease-in" />
                    ))
                }
            </div>
        </div>    
    )
}