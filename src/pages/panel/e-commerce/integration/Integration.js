import React from "react";
import {
  Block,
  BlockBetween,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Col,
  Row,
} from "../../../../components/Component";
import Content from "../../../../layout/content/Content";
import Head from "../../../../layout/head/Head";
import { Badge, Button } from "reactstrap";
import { data } from "./IntegrationData";

const Integration = () => {
  return (
    <React.Fragment>
      <Head title="Integrations"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle page> Integration Apps</BlockTitle>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>

        <Block>
          <Row className="g-gs">
            {data.map((module) => (
              <Col xxl="6" key={module.id}>
                <div className="nk-download">
                  <div className="data">
                    <div className="thumb">
                      <img src={module.image} alt=""></img>
                    </div>
                    <div className="info">
                      <h6 className="title">
                        <span className="name">{module.name}</span>{" "}
                        {module.tag && (
                          <Badge className="badge-dim" color="primary" pill>
                            New
                          </Badge>
                        )}
                      </h6>
                      <div className="meta">
                        <span className="version">
                          <span className="text-soft">Version: </span> <span>{module.meta.version}</span>
                        </span>
                        <span className="release">
                          <span className="text-soft">Status: </span> <span>{module.meta.status}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="actions">
                    <Button color={module.meta.status !== "Active" ? "primary" : "secondary"}>
                      {module.meta.button}
                    </Button>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Block>
      </Content>
    </React.Fragment>
  );
};

export default Integration;
