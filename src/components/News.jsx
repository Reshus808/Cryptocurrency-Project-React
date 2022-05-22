import React, {useState} from 'react'
import { Select, Typography, Row, Col, Avatar, Card } from "antd";
import moment from "moment";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import {useGetCryptosQuery} from "../services/cryptoApi";
import Loader from "./Loader";

const demoImage = 'https://coinrevolution.com/wp-content/uploads/2022/04/Bitcoin-Rebounds-To-41000-Amid-A-Bullish-Projection-1024x640.jpg';
const { Text, Title } = Typography;
const { Option }  = Select;

const News = ({ simplified }) => {
    const [newsCategory, setNewsCategory] = useState('Cryptocurrency')
    const { data: cryptoNews } =useGetCryptoNewsQuery({ newsCategory, count: simplified ? 4 : 100 })
    const { data } = useGetCryptosQuery(100);

    // console.log(cryptoNews)
    if(!cryptoNews?.value) return <Loader/>;
    return (
        <>
            <Row gutter={[24, 24]}>
                {!simplified && (
                    <Select
                        showSearch
                        className='select-news'
                        placeholder='Select a Crypto'
                        optionFilterProp='children'
                        onChange={(value) => setNewsCategory(value)}
                        filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) > 0} >
                        <Option value='Cryptocurrency'>Cryptocurrency</Option>
                        {data?.data?.coins?.map((coin) => <Option value={coin.name}>{coin.name}</Option> )}
                    </Select>
                )}
                {cryptoNews.value.map((news, i) => (
                    <Col xs={24} sm={12} lg={100} key={i}>
                        <Card hoverable className='news-card'>
                            <a href={news.url} target='_blank' rel='noreferrer'>
                                <div className='news-image-container'>
                                    <Title className='news-title' level={4}>{news.name}</Title>
                                    <img style={{ maxWidth: '100px', height: '100px' }} src={news?.image?.thumbnail?.contentUrl || demoImage} alt='' />
                                </div>
                                <p>
                                    {news.description > 100
                                    ? `${news.description.substring(0, 100)}...`
                                     : news.description
                                    }
                                </p>
                                <div className='provider-container'>
                                    <div>
                                        <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt='' />
                                        <Text className='provider-name'>{news.provider[0]?.name}</Text>
                                            </div>
                                        <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>

                                </div>
                            </a>
                        </Card>
                    </Col>
                    ))}
            </Row>
        </>
    )
}
export default News;