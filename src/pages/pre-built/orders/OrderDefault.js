import React, {useCallback, useEffect, useState } from "react";
import Head from "../../../layout/head/Head";
import Content from "../../../layout/content/Content";
import DatePicker from "react-datepicker";
import { orderData } from "./OrderData";
import {
  Block,
  BlockHeadContent,
  BlockTitle,
  BlockBetween,
  BlockHead,
  DataTableHead,
  DataTableItem,
  DataTableRow,
  Icon,
  TooltipComponent,
  PaginationComponent,
  PreviewAltCard,
  Row,
  Col,
  RSelect,
} from "../../../components/Component";
import { getDateStructured } from "../../../utils/Utils";
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem, Button, Modal, ModalBody } from "reactstrap";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import axios from "axios";

const OrderDefault = () => {
  const [data, setData] = useState(orderData);
  const [smOption, setSmOption] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    orderId: "",
    date: new Date(),
    status: "",
    customer: "",
    purchased: "",
    total: "",
    check: false,
  });
  const [view, setView] = useState({
    add: false,
    details: false,
  });
  const [actionSort, setActionSort] = useState("");
  const [sort, setSort] = useState({})
  const [onSearchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage] = useState(7);
  

  const sortActionKycOptions = [
    { value: "customer", label: "customer" },
    { value: "orderId", label: "order number" },
    { value: "createdAt", label: "order date" },
  ];

  //get the orders
  useEffect(async () => {
    let newData;
    newData = await axios.get(process.env.REACT_APP_BASE_URL + 'orders');
    // console.log(newData);
    let defaultData = newData.data.map((item) => {
      item.checked = false;
      return item;
    });
    // console.log(defaultData)
    setData([...defaultData]);
  }, []);

  // Changing state value when searching name
  // useEffect(() => {
  //   if (onSearchText !== "") {
  //     const filteredObject = orderData.filter((item) => {
  //       return item.orderId.includes(onSearchText);
  //     });
  //     setData([...filteredObject]);
  //   } else {
  //     setData([...orderData]);
  //   }
  // }, [onSearchText]);

  // toggle function to view order details
  const toggle = (type) => {
    setView({
      add: type === "add" ? true : false,
      details: type === "details" ? true : false,
    });
  };

  // selects all the order
  const selectorCheck = (e) => {
    let newData;
    newData = data.map((item) => {
      item.checked = e.currentTarget.checked;
      return item;
    });
    setData([...newData]);
  };

  // selects one order
  const onSelectChange = (e, id) => {
    let newData = data;
    let index = newData.findIndex((item) => item._id === id);
    newData[index].checked = e.currentTarget.checked;
    setData([...newData]);
  };

  // resets forms
  const resetForm = () => {
    setFormData({
      id: null,
      orderId: "",
      date: new Date(),
      status: "",
      customer: "",
      purchased: "",
      total: "",
      check: false,
    });
  };

  const onFormSubmit = (form) => {
    const { customer, purchased, total } = form;
    let submittedData = {
      id: data.length + 1,
      orderId: "95981",
      date: getDateStructured(formData.date),
      status: formData.status,
      customer: customer,
      purchased: purchased,
      total: total,
      check: false,
    };
    setData([submittedData, ...data]);
    setView({ add: false, details: false });
    resetForm();
  };

  //function to sort the order
  const onActionSort = (e) => {
    setActionSort(e.value);
    setSort(prev => ({ field: e.value, order: prev.order === 'desc' ? 'asc' : 'desc' }))
  }

  const sortOrder = () => {
    setSort(prev => ({ ...prev, order: prev.order === 'desc' ? 'asc' : 'desc' }))
  }

  const sortedItems = useCallback((list) => {
    const temp = list.map(i => i);
    if (sort.field) {
       if (typeof temp?.[0][sort.field] === 'string') {
        temp.sort((a, b) =>
          sort.order === 'desc' ?
            a[sort.field].localeCompare(b[sort.field]) :
            b[sort.field].localeCompare(a[sort.field]))
      } else if (typeof temp?.[0][sort.field] === 'date') {
        temp.sort((a, b) => sort.order === 'desc' ?
          new Date(a[sort.field]).getTime() - new Date(b[sort.field]).getTime() :
          new Date(b[sort.field]).getTime() - new Date(a[sort.field]).getTime())
      }
    }
    return temp;
  }, [sort])
  // function to load detail data
  const loadDetail = (id) => {
    let index = data.findIndex((item) => item._id === id);
    setFormData(data[index]);
  };

  // OnChange function to get the input data
  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // onChange function for searching name
  const onFilterChange = (e) => {
    setSearchText(e.target.value);   
  };

  // function to close the form modal
  const onFormCancel = () => {
    setView({ add: false, details: false });
    resetForm();
  };

  // function to change to approve property for an item
  const markAsDelivered = (id) => {
    let newData = data;
    let index = newData.findIndex((item) => item._id === id);
    newData[index].status = "Delivered";
    setData([...newData]);
  };

  // function to delete a Order
  const deleteOrder = async(id) => {
    let defaultData = data;
    const res = await axios.delete(process.env.REACT_APP_BASE_URL + 'orders/' + id, {}, {
      headers: {
        token: `Bearer ` + localStorage.accessToken
      }
    });
    defaultData = defaultData.filter((item) => item._id !== id);
    setData([...defaultData]);
  };

  // function to delete the seletected item
  const selectorDeleteOrder = async (submitData) => {
    let deleteData;
    let deleteitems = [...data];
    let selectArray = [];
    let submittedData;
    deleteitems.forEach((item) => {
      if (item.checked === true && item.order_type !== "product") {
        selectArray.push(item._id);
      }
    });
    submittedData = {
      selectArray: selectArray
    }
    const res = await axios.post(process.env.REACT_APP_BASE_URL + 'orders/delete', submittedData, {
      headers: {
        token: `Bearer ` + localStorage.accessToken
      }
    });
    deleteData = data.filter((item) => item.checked !== true);
    setData([...deleteData]);
  };

  // function to change the complete property of an item
  const selectorMarkAsDelivered = () => {
    let newData;
    newData = data.map((item) => {
      if (item.check === true) item.status = "Delivered";
      return item;
    });
    setData([...newData]);
  };

  // Get current list, pagination
  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  // console.log(currentItems);

  // Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const { errors, register, handleSubmit } = useForm();

  return (
    <React.Fragment>
      <Head title="Meals Orders"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle>Meals Orders</BlockTitle>
              <div className="form-wrap d-flex row mt-3 ml-5">
                <RSelect
                  options={sortActionKycOptions}
                  className="w-130px"
                  placeholder="Sort Action"
                  onChange={(e) => onActionSort(e)}
                />
                <span className="d-none d-md-block">
                  <Button
                    color="light"
                    outline
                    aria-haspopup="true" aria-expanded="false"
                    className="btn-dim ml-3 btn btn-icon btn btn-tranparent"
                    onClick={() => sortOrder()}
                  >
                    <em className="icon ni ni-sort"></em>
                  </Button>
                </span>
              </div>
            </BlockHeadContent>
            
            <BlockHeadContent>
              <div className="toggle-wrap nk-block-tools-toggle">
                <a
                  href="#more"
                  className="btn btn-icon btn-trigger toggle-expand mr-n1"
                  onClick={(ev) => {
                    ev.preventDefault();
                    setSmOption(!smOption);
                  }}
                >
                  <Icon name="more-v"></Icon>
                </a>
                <div className="toggle-expand-content" style={{ display: smOption ? "block" : "none" }}>
                  <ul className="nk-block-tools g-3">
                    <li>
                      <div className="form-control-wrap">
                        <div className="form-icon form-icon-right">
                          <Icon name="search"></Icon>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          id="default-04"
                          placeholder="Search by orderId or phone number"
                          onChange={(e) => onFilterChange(e)}
                          style={{width: '300px'}}
                        />
                      </div>
                    </li>
                    {/* <li>
                      <UncontrolledDropdown>
                        <DropdownToggle
                          color="transparent"
                          className="dropdown-toggle dropdown-indicator btn btn-outline-light btn-white"
                        >
                          Status
                        </DropdownToggle>
                        <DropdownMenu right>
                          <ul className="link-list-opt no-bdr">
                            <li>
                              <DropdownItem tag="a" href="#dropdownitem" onClick={(ev) => ev.preventDefault()}>
                                <span>New Items</span>
                              </DropdownItem>
                            </li>
                            <li>
                              <DropdownItem tag="a" href="#dropdownitem" onClick={(ev) => ev.preventDefault()}>
                                <span>Featured</span>
                              </DropdownItem>
                            </li>
                            <li>
                              <DropdownItem tag="a" href="#dropdownitem" onClick={(ev) => ev.preventDefault()}>
                                <span>Out of Stock</span>
                              </DropdownItem>
                            </li>
                          </ul>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </li> */}
                    <li className="nk-block-tools-opt">
                      <Button
                        className="toggle btn-icon d-md-none"
                        color="primary"
                        onClick={() => {
                          toggle("add");
                        }}
                      >
                        <Icon name="plus"></Icon>
                      </Button>
                      {/* <Button
                        className="toggle d-none d-md-inline-flex"
                        color="primary"
                        onClick={() => {
                          toggle("add");
                        }}
                      >
                        <Icon name="plus"></Icon>
                        <span>Add Order</span>
                      </Button> */}
                    </li>
                  </ul>
                </div>
              </div>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>

        <Block>
          <div className="nk-tb-list is-separate is-medium mb-3">
            <DataTableHead className="nk-tb-item">
              <DataTableRow className="nk-tb-col-check">
                <div className="custom-control custom-control-sm custom-checkbox notext">
                  <input
                    type="checkbox"
                    className="custom-control-input form-control"
                    id="pid-all"
                    onChange={(e) => selectorCheck(e)}
                  />
                  <label className="custom-control-label" htmlFor="pid-all"></label>
                </div>
              </DataTableRow>
              <DataTableRow>
                <span className="sub-text">#Order Id</span>
              </DataTableRow>
              <DataTableRow>
                <span className="sub-text">Customer</span>
              </DataTableRow>
              <DataTableRow size="md">
                <span className="sub-text">Amount</span>
              </DataTableRow>
              <DataTableRow>
                <span className="sub-text">Payment Mode</span>
              </DataTableRow>
              <DataTableRow size="sm">
                <span className="sub-text">Payment Status</span>
              </DataTableRow>
              <DataTableRow size="md">
                <span className="sub-text">Cancelled</span>
              </DataTableRow>
              <DataTableRow>
                <span className="sub-text">Order Date</span>
              </DataTableRow>

              <DataTableRow className="nk-tb-col-tools">
                <ul className="nk-tb-actions gx-1 my-n1">
                  <li>
                    <UncontrolledDropdown>
                      <DropdownToggle tag="a" className="btn btn-trigger dropdown-toggle btn-icon mr-n1">
                        <Icon name="more-h"></Icon>
                      </DropdownToggle>
                      <DropdownMenu right>
                        <ul className="link-list-opt no-bdr">
                          {/* <li>
                            <DropdownItem
                              tag="a"
                              href="#markasdone"
                              onClick={(ev) => {
                                ev.preventDefault();
                                selectorMarkAsDelivered();
                              }}
                            >
                              <Icon name="truck"></Icon>
                              <span>Mark As Delivered</span>
                            </DropdownItem>
                          </li> */}
                          <li>
                            <DropdownItem
                              tag="a"
                              href="#remove"
                              onClick={(ev) => {
                                ev.preventDefault();
                                selectorDeleteOrder();
                              }}
                            >
                              <Icon name="trash"></Icon>
                              <span>Remove Orders</span>
                            </DropdownItem>
                          </li>
                        </ul>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </li>
                </ul>
              </DataTableRow>
            </DataTableHead>

            {currentItems.length > 0 
              ? sortedItems(currentItems).filter((item) => item.order_type.indexOf("product") === -1 && (item.customer.indexOf(onSearchText) !== -1 || item.phone_number.indexOf(onSearchText) !== -1)).map((item, index) => (
                  <DataTableItem key={index}>
                    <DataTableRow className="nk-tb-col-check">
                      <div className="custom-control custom-control-sm custom-checkbox notext">
                        <input
                          type="checkbox"
                          className="custom-control-input form-control"
                          defaultChecked={item.checked}
                          id={item._id + "oId-all"}
                          key={Math.random()}
                          onChange={(e) => onSelectChange(e, item._id)}
                        />
                        <label className="custom-control-label" htmlFor={item._id + "oId-all"}></label>
                      </div>
                    </DataTableRow>
                    <DataTableRow>
                      <span className="tb-sub">#{item._id}</span>
                    </DataTableRow>
                    {/* <DataTableRow size="md">
                      <span>{item.date}</span>
                    </DataTableRow> */}
                    {/* <DataTableRow>
                      <span
                        className={`dot bg-${item.status === "Delivered" ? "success" : "warning"} d-mb-none`}
                      ></span>
                      <span
                        className={`badge badge-sm badge-dot has-bg badge-${
                          item.status === "Delivered" ? "success" : "warning"
                        } d-none d-mb-inline-flex`}
                      >
                        {item.status}
                      </span>
                    </DataTableRow> */}
                    <DataTableRow size="sm">
                      <Link to={`${process.env.PUBLIC_URL}/user-details-regular/${item.userId}`}>
                        <span className="tb-sub">{item.customer}</span>
                      </Link>
                    </DataTableRow>
                    <DataTableRow size="md">
                      <span className="tb-sub text-primary">{item.amount}</span>
                    </DataTableRow>
                    <DataTableRow>
                      <span className="tb-lead">{item.payment_mode}</span>
                    </DataTableRow>
                    <DataTableRow>
                      <span className={`badge badge-sm badge-dot has-bg badge-${
                          item.payment_status === "paid" ? "success" : "warning"
                        } d-none d-mb-inline-flex`}>{item.payment_status}</span>
                    </DataTableRow>
                    <DataTableRow>
                      <span className="tb-lead">{item.cancelled}</span>
                    </DataTableRow>
                    <DataTableRow>
                      <span className="tb-lead">{item.createdAt}</span>
                    </DataTableRow>
                    <DataTableRow className="nk-tb-col-tools">
                      <ul className="nk-tb-actions gx-1">
                        {/* {item.status !== "Delivered" && (
                          <li className="nk-tb-action-hidden" onClick={() => markAsDelivered(item._id)}>
                            <TooltipComponent
                              tag="a"
                              containerClassName="btn btn-trigger btn-icon"
                              id={"delivery" + item._id}
                              icon="truck"
                              direction="top"
                              text="Mark as Delivered"
                            />
                          </li>
                        )} */}
                        <li
                          className="nk-tb-action-hidden"
                          onClick={() => {
                            loadDetail(item._id);
                            toggle("details");
                          }}
                        >
                          <TooltipComponent
                            tag="a"
                            containerClassName="btn btn-trigger btn-icon"
                            id={"view" + item._id}
                            icon="eye"
                            direction="top"
                            text="View Details"
                          />
                        </li>
                        <li>
                          <UncontrolledDropdown>
                            <DropdownToggle tag="a" className="btn btn-icon dropdown-toggle btn-trigger">
                              <Icon name="more-h"></Icon>
                            </DropdownToggle>
                            <DropdownMenu right>
                              <ul className="link-list-opt no-bdr">
                                <li>
                                  <DropdownItem
                                    tag="a"
                                    href="#dropdown"
                                    onClick={(ev) => {
                                      ev.preventDefault();
                                      loadDetail(item._id);
                                      toggle("details");
                                    }}
                                  >
                                    <Icon name="eye"></Icon>
                                    <span>Order Details</span>
                                  </DropdownItem>
                                </li>
                                {/* {item.status !== "Delivered" && (
                                  <li>
                                    <DropdownItem
                                      tag="a"
                                      href="#dropdown"
                                      onClick={(ev) => {
                                        ev.preventDefault();
                                        markAsDelivered(item._id);
                                      }}
                                    >
                                      <Icon name="truck"></Icon>
                                      <span>Mark as Delivered</span>
                                    </DropdownItem>
                                  </li>
                                )} */}
                                <li>
                                  <DropdownItem
                                    tag="a"
                                    href="#dropdown"
                                    onClick={(ev) => {
                                      ev.preventDefault();
                                      deleteOrder(item._id);
                                    }}
                                  >
                                    <Icon name="trash"></Icon>
                                    <span>Remove Order</span>
                                  </DropdownItem>
                                </li>
                              </ul>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </li>
                      </ul>
                    </DataTableRow>
                  </DataTableItem>
                ))
              : null}
          </div>
          <PreviewAltCard>
            {data.length > 0 ? (
              <PaginationComponent
                itemPerPage={itemPerPage}
                totalItems={data.length}
                paginate={paginate}
                currentPage={currentPage}
              />
            ) : (
              <div className="text-center">
                <span className="text-silent">No orders found</span>
              </div>
            )}
          </PreviewAltCard>
        </Block>

        {/* <Modal isOpen={view.add} toggle={() => onFormCancel()} className="modal-dialog-centered" size="lg">
          <ModalBody>
            <a href="#cancel" className="close">
              {" "}
              <Icon
                name="cross-sm"
                onClick={(ev) => {
                  ev.preventDefault();
                  onFormCancel();
                }}
              ></Icon>
            </a>
            <div className="p-2">
              <h5 className="title">Add Order</h5>
              <div className="mt-4">
                <form onSubmit={handleSubmit(onFormSubmit)}>
                  <Row className="g-3">
                    <Col md="12">
                      <div className="form-group">
                        <label className="form-label" htmlFor="customer">
                          Customer Name
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                            name="customer"
                            onChange={(e) => onInputChange(e)}
                            ref={register({
                              required: "This field is required",
                            })}
                            defaultValue={formData.customer}
                          />
                          {errors.customer && <span className="invalid">{errors.customer.message}</span>}
                        </div>
                      </div>
                    </Col>
                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="date">
                          Date of order
                        </label>
                        <div className="form-control-wrap">
                          <DatePicker
                            selected={formData.date}
                            className="form-control"
                            onChange={(date) => setFormData({ ...formData, date: date })}
                          />
                          {errors.date && <span className="invalid">{errors.date.message}</span>}
                        </div>
                      </div>
                    </Col>
                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="purchased">
                          Purchased Product
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                            name="purchased"
                            ref={register({ required: "This is required" })}
                            defaultValue={formData.purchased}
                          />
                          {errors.purchased && <span className="invalid">{errors.purchased.message}</span>}
                        </div>
                      </div>
                    </Col>
                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="total">
                          Total Price
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="number"
                            className="form-control"
                            name="total"
                            ref={register({ required: "This is required" })}
                            defaultValue={formData.total}
                          />
                          {errors.total && <span className="invalid">{errors.total.message}</span>}
                        </div>
                      </div>
                    </Col>
                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="status">
                          Status
                        </label>
                        <div className="form-control-wrap">
                          <RSelect
                            name="status"
                            options={[
                              { value: "On Hold", label: "On Hold" },
                              { value: "Delivered", label: "Delivered" },
                            ]}
                            onChange={(e) => setFormData({ ...formData, status: e.value })}
                            defaultValue={formData.status}
                          />
                        </div>
                      </div>
                    </Col>

                    <Col size="12">
                      <Button color="primary" type="submit">
                        <Icon className="plus"></Icon>
                        <span>Add Order</span>
                      </Button>
                    </Col>
                  </Row>
                </form>
              </div>
            </div>
          </ModalBody>
        </Modal> */}

        <Modal isOpen={view.details} toggle={() => onFormCancel()} className="modal-dialog-centered" size="lg">
          <ModalBody>
            <a href="#cancel" className="close">
              {" "}
              <Icon
                name="cross-sm"
                onClick={(ev) => {
                  ev.preventDefault();
                  onFormCancel();
                }}
              ></Icon>
            </a>
            <div className="nk-tnx-details mt-sm-3">
              <div className="nk-modal-head mb-3">
                <h4 className="title">Order Details (#{formData._id})</h4>
              </div>
              <Row className="gy-3">
                <Col lg={12}>
                  <h6>DELIVER INFORMATION</h6>
                </Col>
              </Row>
              <Row className="gy-3">
                <Col lg={4}>
                  <span className="sub-text">Customer</span>
                  <span className="caption-text">{formData.customer}</span>
                </Col>
                <Col lg={4}>
                  <span className="sub-text">Phone Number</span>
                  <span className="caption-text">{formData.phone_number}</span>
                </Col>
                <Col lg={4}>
                  <span className="sub-text">Delivery Date</span>
                  <span className="caption-text">{formData.delivery_date}</span>
                </Col>
                <Col lg={4}>
                  <span className="sub-text">Delivery Status</span>
                  <span className="caption-text">{formData.delivery_status}</span>
                </Col>
                <Col lg={4}>
                  <span className="sub-text">Deliver</span>
                  <span className="caption-text">{formData.deliver}</span>
                </Col>
              </Row>
              <Row className="gy-3">
                <Col lg={12}>
                  <h6>ADDRESS INFORMATION</h6>
                </Col>
              </Row>
              <Row className="gy-3">
                <Col lg={6}>
                  <span className="sub-text">Address</span>
                  <span className="caption-text">{formData.address}</span>
                </Col>
                <Col lg={3}>
                  <span className="sub-text">Latitude</span>
                  <span className="caption-text">{formData.latitude}</span>
                </Col>
                <Col lg={3}>
                  <span className="sub-text">Longtitude</span>
                  <span className="caption-text">{formData.longtitude}</span>
                </Col>
              </Row>
              <Row className="gy-3">
                <Col lg={12}>
                  <h6>ORDER INFORMATION</h6> 
                </Col>
              </Row>
              <Row className="gy-3">
                <Col lg={6}>
                  <span className="sub-text">Order ID</span>
                  <span className="caption-text">{formData._id}</span>
                </Col>
                <Col lg={3}>
                  <span className="sub-text">Order Type</span>
                  <span className="caption-text">{formData.order_type}</span>
                </Col>
                <Col lg={3}>
                  <span className="sub-text">Order Total</span>
                  <span className="caption-text">{formData.order_total}</span>
                </Col>
                <Col lg={4}>
                  <span className="sub-text">Order Cancelled</span>
                  <span className="caption-text">{formData.cancelled}</span>
                </Col>
              </Row>
              <Row className="gy-3">
                <Col lg={12}>
                  <h6>AMOUNT INFORMATION</h6>
                </Col>
              </Row>
              <Row className="gy-3">
                <Col lg={4}>
                  <span className="sub-text">Amount</span>
                  <span className="caption-text">{formData.address}</span>
                </Col>
                <Col lg={4}>
                  <span className="sub-text">Promo Code</span>
                  <span className="caption-text">{formData.promocode}</span>
                </Col>
                <Col lg={4}>
                  <span className="sub-text">Price</span>
                  <span className="caption-text">{formData.price}</span>
                </Col>
                <Col lg={4}>
                  <span className="sub-text">Discount</span>
                  <span className="caption-text">{formData.discount}</span>
                </Col>
                <Col lg={4}>
                  <span className="sub-text">Total After Discount</span>
                  <span className="caption-text">{formData.total_after_discount}</span>
                </Col>
                <Col lg={4}>
                  <span className="sub-text">Tax</span>
                  <span className="caption-text">{formData.shipping_fee}</span>
                </Col>
              </Row>
            </div>
          </ModalBody>
        </Modal>
      </Content>
    </React.Fragment>
  );
};

export default OrderDefault;
