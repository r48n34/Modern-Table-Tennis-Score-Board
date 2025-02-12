import RoadMapComp from "../components/roadMap/RoadMapComp";
import { Helmet } from "react-helmet-async";

interface RoadMapProps {
    lang: "en" | "ch"
}

function RoadMap({ lang = "en" }: RoadMapProps){
    return (
        <>
        <Helmet>
            <title>Road Map | Modern Table Tennis Score Board</title>
        </Helmet>

        <RoadMapComp lang={lang}/>
        </>
    )
}
    
export default RoadMap
