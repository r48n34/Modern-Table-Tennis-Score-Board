import BigScoreBoard from "../components/BigScoreBoard";
import { Helmet } from "react-helmet-async";
// import FooterComp from "../components/common/FooterComp";

function BigScoreOnePages() {
    return (
        <>
            <Helmet>
                <title>Score Board | Modern Table Tennis Score Board</title>
            </Helmet>

            <BigScoreBoard showTitle={true} />
        </>
    )
}

export default BigScoreOnePages
