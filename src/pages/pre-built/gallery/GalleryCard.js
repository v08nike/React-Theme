import React, { useState } from "react";
import { Card } from "reactstrap";
import Content from "../../../layout/content/Content";
import Head from "../../../layout/head/Head";
import {
  BlockBetween,
  BlockDes,
  Block,
  BlockHeadContent,
  BlockHead,
  BlockTitle,
  Col,
  Row,
  Icon,
  Button,
  UserAvatar,
} from "../../../components/Component";
import { galleryData } from "./GalleryData";
import ImageContainer from "../../../components/partials/gallery/GalleryImage";
import { findUpper } from "../../../utils/Utils";

const GalleryCard = () => {
  const [data] = useState(galleryData);
  return (
    <React.Fragment>
      <Head title="Gallery"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween className="g-3">
            <BlockHeadContent>
              <BlockTitle page>Image Gallery</BlockTitle>
              <BlockDes className="text-soft">
                <p>
                  You have total <span className="text-base">1,257</span> Media.
                </p>
              </BlockDes>
            </BlockHeadContent>
            <BlockHeadContent>
              <Button color="light" outline className="bg-white d-none d-sm-inline-flex">
                <Icon name="download-cloud"></Icon>
                <span>Download All</span>
              </Button>
              <Button color="light" outline className="btn-icon bg-white d-inline-flex d-sm-none">
                <Icon name="download-cloud"></Icon>
              </Button>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>

        <Block>
          <Row className="g-gs">
            {data.map((item) => {
              return (
                <Col sm={6} lg={4} xxl={3} key={item.id}>
                  <Card className="gallery">
                    <ImageContainer img={item.img} />
                    <div className="gallery-body card-inner align-center justify-between flex-wrap g-2">
                      <div className="user-card">
                        <UserAvatar
                          theme={item.theme}
                          text={findUpper(item.userName)}
                          image={item.userImg}
                        ></UserAvatar>
                        <div className="user-info">
                          <span className="lead-text">{item.userName}</span>
                          <span className="sub-text">{item.userEmail}</span>
                        </div>
                      </div>
                      <div>
                        <Button className="btn-p-0 btn-nofocus">
                          <Icon name="heart"></Icon>
                          <span>{item.heart}</span>
                        </Button>
                      </div>
                    </div>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Block>
      </Content>
    </React.Fragment>
  );
};

export default GalleryCard;
