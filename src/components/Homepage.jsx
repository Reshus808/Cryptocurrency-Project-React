import React from 'react'
import millify from "millify";
import { Typography, Row, Col, Statistic } from "antd";
import { Link } from 'react-router-dom';
import { Cryptocurrencies, News } from "./index";

import { useGetCryptosQuery } from "../services/cryptoApi";
// import Text from "./text";
import Loader from "./Loader";
// import styles from './styles/homePage.module.scss'
// import Navbar from "./Navbar";
const { Title } = Typography;

const Homepage = () => {
    const { data, isFetching } = useGetCryptosQuery(10);
    const globalStats = data?.data?.stats;
    console.log(data)
    if(isFetching) return <Loader/>;
    return (

        <>

            {/*<Text/>*/}
            <Title level={2}>Global Crypto Stats</Title>
            <Row>
                <Col span={12}><Statistic title='Total Cryptocurrencies' value= {millify(globalStats.totalCoins)} /></Col>
                <Col span={12}><Statistic title='Total Exchanges' value={millify(globalStats.totalExchanges)}  /></Col>
                <Col span={12}><Statistic title='Total Market Cap' value={millify(globalStats.totalMarketCap)}  /></Col>
                <Col span={12}><Statistic title='Total 24h Volume' value={millify(globalStats.total24hVolume)}  /></Col>
                <Col span={12}><Statistic title='Total Market' value={millify(globalStats.totalMarkets)}  /></Col>
            </Row>
            <div >
                <Title  level={2}>Top 10 Cryptocurrencies in the world</Title>
                <Title  level={3} ><Link to='/cryptocurrencies'>Show more</Link></Title>
            </div>
            <Cryptocurrencies simplified={true} />
            <div>
                <Title  level={2}>Latest Crypto News</Title>
                <Title  level={3}><Link to='/news'>Show more</Link></Title>
            </div>
            <News simplified />
        </>
    )
}
export default Homepage;