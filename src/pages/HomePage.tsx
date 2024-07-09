import Home from "~/sections/home";
import {getHomeData} from "~/data/homedata";

export default function HomePage() {
    const data = getHomeData()
    return <Home data={data} />
}