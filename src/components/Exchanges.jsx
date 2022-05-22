import React from 'react';
import millify from 'millify';
import { Collapse, Row, Col, Typography, Avatar } from 'antd';
import HTMLReactParser from 'html-react-parser';

import { useGetCryptoExchangesQuery } from '../services/cryptoExchangesApi';
import Loader from './Loader';

const { Text } = Typography;
const { Panel } = Collapse;

const Exchanges = () => {
    const { data, isFetching } = useGetCryptoExchangesQuery();

    console.log(data);
    if (isFetching) return <Loader />;

    return (
        <>
        <div className='column'>
            <Row>
                <Col span={4}>Rank</Col>
                <Col span={4}>Country</Col>
                <Col span={4}>24h Trade Volume</Col>
                <Col span={4}>Score</Col>
                <Col span={4}>Year Established</Col>
            </Row>
             </div>
            <Row>
            {data.map((exchange) => (
          <Col span={24}>
            <Collapse>
              <Panel
                key={exchange.id}
                showArrow={false}
                header={(
                  <Row key={exchange.id}>
                    <Col span={4}>
                      <Text><strong>{exchange.trust_score_rank}.</strong></Text>
                      <Avatar className="exchange-image" src={exchange.image} />
                      <Text><strong>{exchange.name}</strong></Text>
                    </Col>
                    <Col span={4}>{exchange.country || "United States"}</Col>
                    <Col span={4}>${millify(exchange.trade_volume_24h_btc)}</Col>
                    <Col span={4}>{exchange.trust_score}</Col>
                    <Col span={4}>{exchange.year_established || 2022}</Col>
                  </Row>
                  )}
              >
                {HTMLReactParser(exchange.description || '')}
              </Panel>
            </Collapse>
          </Col>
        ))}
            </Row>
        </>
    );
};

export default Exchanges;