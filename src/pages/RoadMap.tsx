import RoadMapComp from "../components/roadMap/RoadMapComp";

interface RoadMapProps {
    lang: "en" | "ch"
}

function RoadMap({ lang = "en" }: RoadMapProps){
    return (
        <>
        <RoadMapComp lang={lang}/>
        </>
    )
}
    
export default RoadMap
