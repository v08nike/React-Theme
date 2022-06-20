import React from "react";
import { Button, FormGroup } from "reactstrap";
import {
  Block,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Col,
  PreviewAltCard,
  Row,
} from "../../../../components/Component";
import Content from "../../../../layout/content/Content";
import Head from "../../../../layout/head/Head";

const Settings = () => {
  return (
    <React.Fragment>
      <Head title="Settings"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockHeadContent>
            <BlockTitle page>Settings</BlockTitle>
          </BlockHeadContent>
        </BlockHead>

        <Block>
          <PreviewAltCard>
            <h5 className="card-title">Web Store Setting</h5>
            <p>Here is your basic store setting of your website.</p>

            <form className="gy-3 form-settings">
              <Row className="g-3 align-center">
                <Col lg="5">
                  <FormGroup>
                    <label className="form-label" htmlFor="site-name">
                      Store Name
                    </label>
                    <span className="form-note">Specify the name of your website.</span>
                  </FormGroup>
                </Col>
                <Col lg="7">
                  <FormGroup>
                    <div className="form-control-wrap">
                      <input type="text" className="form-control" id="site-name" defaultValue="My Store" />
                    </div>
                  </FormGroup>
                </Col>
              </Row>
              <Row className="g-3 align-center">
                <Col lg="5">
                  <FormGroup>
                    <label className="form-label" htmlFor="site-email">
                      Site Email
                    </label>
                    <span className="form-note">Specify the email address of your website.</span>
                  </FormGroup>
                </Col>
                <Col lg="7">
                  <FormGroup>
                    <div className="form-control-wrap">
                      <input type="text" className="form-control" id="site-email" defaultValue="info@softnio.com" />
                    </div>
                  </FormGroup>
                </Col>
              </Row>
              <Row className="g-3 align-center">
                <Col lg="5">
                  <FormGroup>
                    <label className="form-label" htmlFor="site-copyright">
                      Site Copyright
                    </label>
                    <span className="form-note">Copyright information of your website.</span>
                  </FormGroup>
                </Col>
                <Col lg="7">
                  <FormGroup>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        className="form-control"
                        id="site-copyright"
                        defaultValue="&copy; 2019, DashLite. All Rights Reserved."
                      />
                    </div>
                  </FormGroup>
                </Col>
              </Row>
              <Row className="g-3 align-center">
                <Col lg="5">
                  <FormGroup>
                    <label className="form-label">Allow Registration</label>
                    <span className="form-note">Enable or disable registration from site.</span>
                  </FormGroup>
                </Col>
                <Col lg="7">
                  <ul className="custom-control-group g-3 align-center flex-wrap">
                    <li>
                      <div className="custom-control custom-radio">
                        <input
                          type="radio"
                          className="custom-control-input form-control"
                          defaultChecked={true}
                          name="reg-public"
                          id="reg-enable"
                        />
                        <label className="custom-control-label" htmlFor="reg-enable">
                          Enable
                        </label>
                      </div>
                    </li>
                    <li>
                      <div className="custom-control custom-radio">
                        <input
                          type="radio"
                          className="custom-control-input form-control"
                          name="reg-public"
                          id="reg-disable"
                        />
                        <label className="custom-control-label" htmlFor="reg-disable">
                          Disable
                        </label>
                      </div>
                    </li>
                    <li>
                      <div className="custom-control custom-radio">
                        <input
                          type="radio"
                          className="custom-control-input form-control"
                          name="reg-public"
                          id="reg-request"
                        />
                        <label className="custom-control-label" htmlFor="reg-request">
                          On Request
                        </label>
                      </div>
                    </li>
                  </ul>
                </Col>
              </Row>
              <Row className="g-3 align-center">
                <Col lg="5">
                  <FormGroup>
                    <label className="form-label">Main Website</label>
                    <span className="form-note">Specify the URL if your main website is external.</span>
                  </FormGroup>
                </Col>
                <Col lg="7">
                  <FormGroup>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        className="form-control"
                        name="site-url"
                        defaultValue="https://www.softnio.com"
                      />
                    </div>
                  </FormGroup>
                </Col>
              </Row>
              <Row className="g-3 align-center">
                <Col lg="5">
                  <FormGroup>
                    <label className="form-label" htmlFor="site-off">
                      Maintanance Mode
                    </label>
                    <span className="form-note">Enable to make website make offline.</span>
                  </FormGroup>
                </Col>
                <Col lg="7">
                  <FormGroup>
                    <div className="form-control-wrap">
                      <div className="custom-control custom-switch">
                        <input
                          type="checkbox"
                          className="custom-control-input form-control"
                          name="reg-public"
                          id="site-off"
                        />
                        <label className="custom-control-label" htmlFor="site-off">
                          Offline
                        </label>
                      </div>
                    </div>
                  </FormGroup>
                </Col>
              </Row>
              <Row className="g-3">
                <Col lg="5" className="offset-lg-5">
                  <FormGroup className="mt-2">
                    <Button size="lg" color="primary" type="submit">
                      Update
                    </Button>
                  </FormGroup>
                </Col>
              </Row>
            </form>
          </PreviewAltCard>
        </Block>
      </Content>
    </React.Fragment>
  );
};
export default Settings;
