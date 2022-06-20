import React, { useCallback, useContext, useEffect, useState, useRef } from "react";
import exportFromJSON from "export-from-json";
import * as referralCodes from "referral-codes"
import {
  DropdownMenu,
  DropdownToggle,
  FormGroup,
  UncontrolledDropdown,
  Modal,
  ModalBody,
  DropdownItem,
  Form,
} from "reactstrap";
import {
  Block,
  BlockBetween,
  BlockDes,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Icon,
  Col,
  UserAvatar,
  PaginationComponent,
  Button,
  DataTableHead,
  DataTableRow,
  DataTableItem,
  TooltipComponent,
  RSelect,
  PreviewAltCard,
} from "../../../components/Component";
import Content from "../../../layout/content/Content";
import Head from "../../../layout/head/Head";
import { filterStatus, userData } from "./UserData";
import { findUpper } from "../../../utils/Utils";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { UserContext } from "./UserContext";
import axios from 'axios'
import { useSelector } from 'react-redux'

const UserListDefaultPage = () => {
  const { contextData } = useContext(UserContext);
  const [data, setData] = contextData;

  const [sm, updateSm] = useState(false);
  const [onSearchText, setSearchText] = useState("");
  const [actionSort, setActionSort] = useState("");
  const [modal, setModal] = useState({
    edit: false,
    add: false,
  });
  const [editId, setEditedId] = useState();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    status: "unblock",
  });
  const sortActionKycOptions = [
    { value: "username", label: "name" },
    { value: "phone", label: "phone_number" },
    { value: "wallet_balance", label: "wallet_balance" },
  ];
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage] = useState(10);
  const [sort, setSort] = useState({})
  const selectFileRef = useRef(null);

  const searchValue = useSelector((state) => state.search.value);

  // Changing state value when searching name
  useEffect(() => {
    if (onSearchText !== "") {
      const filteredObject = data.filter((item) => {
        return (
          item.name.toLowerCase().includes(onSearchText.toLowerCase()) ||
          item.email.toLowerCase().includes(onSearchText.toLowerCase()) ||
          item.phone.includes(onSearchText)
        );
      });
      setData([...filteredObject]);
    } else {
      setData([...data]);
    }
  }, [onSearchText, setData]);

  // function to change the selected property of an item
  const onSelectChange = (e, id) => {
    let newData = data;
    let index = newData.findIndex((item) => item._id === id);

    newData[index].checked = e.currentTarget.checked;
    setData([...newData]);
  };

  // function to export userdata
  const exportData = () => {
    const data = currentItems;
    const fileName = 'userdata';
    const exportType = exportFromJSON.types.csv;
    exportFromJSON({ data, fileName, exportType });
  }

  //function to import userdata
  const importData = (e) => {
    // console.log(e.target.files[0])
    const fileReader = new FileReader();
    if (e.target.files[0]) {
      fileReader.onload = function (event) {
        const text = event.target.result;
        const array = csvFileToArray(text);
        // console.log(array);
        setData(array);
      };
      fileReader.readAsText(e.target.files[0]);
      // setContextData(e.target.files[0])
    }

  }

  const csvFileToArray = string => {
    string = string.replaceAll("\"", "");
    const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
    const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");

    const array = csvRows.map(i => {
      const values = i.split(",");
      const obj = csvHeader.reduce((object, header, index) => {
        object[header] = values[index];
        return object;
      }, {});
      return obj;
    });

    return array
  };

  // function to reset the form
  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      address: "",
      phone: "",
      status: "unblock",
    });
  };

  // function to close the form modal
  const onFormCancel = () => {
    setModal({ edit: false, add: false });
    resetForm();
  };

  // submit function to add a new item
  const onFormSubmit = async (submitData) => {
    const { name, email, address, phone } = submitData;
    const status = formData.status;
    const referral_code = referralCodes.generate({
      prefix: 'user_',
      length: 8,
      count: 1
    });
    // console.log(referral_code[0]);
    let submittedData = {
      username: name,
      email: email,
      address: address,
      phone: "+" + phone,
      status: status,
      referral_code: referral_code[0],
      password: process.env.REACT_APP_PASSWORD,
    };

    setData([submittedData, ...data]);
    const res = await axios.post(process.env.REACT_APP_BASE_URL + 'users', submittedData, {
      headers: {
        token: `Bearer ` + localStorage.accessToken
      }
    });
    setModal({ edit: false }, { add: false });
    resetForm();
  };

  // submit function to update a new item
  const onEditSubmit = async (submitData) => {
    const { name, email, address, phone } = submitData;
    let submittedData;
    let newitems = [...data];
    newitems.forEach((item) => {
      if (item._id === editId) {
        submittedData = {
          _id: item._id,
          username: name,
          address: address,
          email: email,
          phone: phone,
          status: formData.status,
        };
      }
    });
    let index = newitems.findIndex((item) => item._id === editId);
    newitems[index] = submittedData;
    setData([...newitems]);
    const res = await axios.put(process.env.REACT_APP_BASE_URL + 'users/' + editId, submittedData, {
      headers: {
        token: `Bearer ` + localStorage.accessToken
      }
    });
    setModal({ edit: false });
    resetForm();
  };

  // function that loads the want to editted data
  const onEditClick = (id) => {
    setEditedId(id);
    data.forEach((item) => {
      if (item._id === id) {
        setFormData({
          name: item.username,
          email: item.email,
          status: item.status,
          phone: item.phone,
          address: item.address,
        });
        setModal({ edit: true }, { add: false });
      }
    });
  };

  // function to change to delete property for an item
  const deleteUser = async (id) => {
    setEditedId(id);
    let newData;
    const res = await axios.delete(process.env.REACT_APP_BASE_URL + 'users/' + id, {}, {
      headers: {
        token: `Bearer ` + localStorage.accessToken
      }
    });
    newData = data.filter((item) => item._id !== id);
    setData([...newData]);
  };

  // function to change the check property of an item
  const selectorCheck = (e) => {
    let newData;
    newData = data.map((item) => {
      item.checked = e.currentTarget.checked;
      return item;
    });
    setData([...newData]);
  };

  //function to sort the user
  const onActionSort = (e) => {
    setActionSort(e.value);
    setSort(prev => ({ field: e.value, order: prev.order === 'desc' ? 'asc' : 'desc' }))
  }
  const sortUser = () => {
    setSort(prev => ({ ...prev, order: prev.order === 'desc' ? 'asc' : 'desc' }))
  }

  const sortedItems = useCallback((list) => {
    const temp = list.map(i => i);
    if (sort.field) {
      if (typeof temp?.[0][sort.field] === 'number' || sort.field === 'wallet_balance') {
        temp.sort((a, b) => sort.order === 'desc' ? a - b : b - a)
      } else if (typeof temp?.[0][sort.field] === 'string') {
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

  // function to delete the seletected item
  const selectorDeleteUser = async (submitData) => {
    let deleteData;
    let deleteitems = [...data];
    let selectArray = [];
    let submittedData;
    deleteitems.forEach((item) => {
      if (item.checked === true) {
        selectArray.push(item._id);
      }
    });
    submittedData = {
      selectArray: selectArray
    }
    const res = await axios.post(process.env.REACT_APP_BASE_URL + 'users/delete', submittedData, {
      headers: {
        token: `Bearer ` + localStorage.accessToken
      }
    });
    deleteData = data.filter((item) => item.checked !== true);
    setData([...deleteData]);
  };


  // function to change the complete property of an item
  // const selectorSuspendUser = () => {
  //   let newData;
  //   newData = data.map((item) => {
  //     if (item.checked === true) item.status = "Suspend";
  //     return item;
  //   });
  //   setData([...newData]);
  // };

  // Get current list, pagination
  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const { errors, register, handleSubmit } = useForm();

  return (
    <React.Fragment>
      <Head title="Users List"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle tag="h3" page>
                Users Lists
              </BlockTitle>
              <BlockDes className="text-soft">
                <p>You have total {currentItems.length.toLocaleString("en-US")} users.</p>
              </BlockDes>
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
                    onClick={() => sortUser()}
                  >
                    <em className="icon ni ni-sort"></em>
                  </Button>
                </span>
              </div>
            </BlockHeadContent>
            <BlockHeadContent>
              <div className="toggle-wrap nk-block-tools-toggle">
                <Button
                  className={`btn-icon btn-trigger toggle-expand mr-n1 ${sm ? "active" : ""}`}
                  onClick={() => updateSm(!sm)}
                >
                  <Icon name="menu-alt-r"></Icon>
                </Button>
                <div className="toggle-expand-content" style={{ display: sm ? "block" : "none" }}>
                  <ul className="nk-block-tools g-3">
                    <li>
                      <input
                        type={"file"}
                        id={"csvFileInput"}
                        accept={".csv"}
                        style={{ display: 'none' }}
                        ref={selectFileRef}
                        onChange={(e) => importData(e)}
                      />
                      <Button color="light" outline className="btn-white mr-2" onClick={() => selectFileRef.current.click()}>
                        <Icon name="upload-cloud"></Icon>
                        <span>Import</span>
                      </Button>
                    </li>
                    <li>
                      <Button color="light" outline className="btn-white" onClick={() => exportData()}>
                        <Icon name="download-cloud"></Icon>
                        <span>Export</span>
                      </Button>
                    </li>
                    <li className="nk-block-tools-opt">
                      <Button color="primary" className="btn-icon" onClick={() => setModal({ add: true })}>
                        <Icon name="plus"></Icon>
                      </Button>
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
                    onChange={(e) => selectorCheck(e)}
                    id="uid"
                  />
                  <label className="custom-control-label" htmlFor="uid"></label>
                </div>
              </DataTableRow>
              <DataTableRow>
                <div className="d-flex row">
                  <div className="sub-text d-flex align-items-center col-md-8"><span>User</span></div>
                  {/* <button type="button"
                    aria-haspopup="true"
                    aria-expanded="false"
                    className="btn btn-icon btn-trigger btn btn-tranparent"
                    onClick={(ev) => {
                      ev.preventDefault();
                      sortUser();
                    }}>
                    <em className="icon ni ni-sort"></em>
                  </button> */}
                </div>
              </DataTableRow>
              {/* <DataTableRow size="mb">
                <span className="sub-text">mobile</span>
              </DataTableRow>
              <DataTableRow size="md">
                <span className="sub-text">mobile2</span>
              </DataTableRow>
              <DataTableRow size="lg">
                <span className="sub-text">dob</span>
              </DataTableRow>
              <DataTableRow size="lg">
                <span className="sub-text">gender</span>
              </DataTableRow>
              <DataTableRow size="lg">
                <span className="sub-text">refer_code</span>
              </DataTableRow>
              <DataTableRow size="lg">
                <span className="sub-text">refered_by</span>
              </DataTableRow>
              <DataTableRow size="lg">
                <span className="sub-text">preferred_lang</span>
              </DataTableRow> */}
              <DataTableRow size="lg">
                <span className="sub-text">Email</span>
              </DataTableRow>
              <DataTableRow size="lg">
                <span className="sub-text">Address</span>
              </DataTableRow>
              <DataTableRow size="lg">
                <span className="sub-text">Phone number</span>
              </DataTableRow>
              <DataTableRow size="lg">
                <span className="sub-text">Status</span>
              </DataTableRow>
              {/* <DataTableRow size="md">
                <span className="sub-text">Status</span>
              </DataTableRow> */}
              <DataTableRow className="nk-tb-col-tools text-center">
                <UncontrolledDropdown>
                  <DropdownToggle color="tranparent" className="dropdown-toggle btn btn-icon btn-trigger mr-n1">
                    <Icon name="more-h"></Icon>
                  </DropdownToggle>
                  <DropdownMenu right>
                    <ul className="link-list-opt no-bdr">
                      <li>
                        <DropdownItem
                          tag="a"
                          href="#"
                          onClick={(ev) => {
                            ev.preventDefault();
                            selectorDeleteUser();
                          }}
                        >
                          <Icon name="na"></Icon>
                          <span>Remove Selected</span>
                        </DropdownItem>
                      </li>
                      {/* <li>
                        <DropdownItem
                          tag="a"
                          href="#"
                          onClick={(ev) => {
                            ev.preventDefault();
                            selectorSuspendUser();
                          }}
                        >
                          <Icon name="trash"></Icon>
                          <span>Suspend Selected</span>
                        </DropdownItem>
                      </li> */}
                    </ul>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </DataTableRow>
            </DataTableHead>
            {/*Head*/}
            {currentItems.length > 0
              ? sortedItems(currentItems).filter((item) => item.username.indexOf(searchValue) !== -1 || item.email.indexOf(searchValue) !== -1 || item.phone.indexOf(searchValue) !== -1).map((item, index) => (
                <DataTableItem key={index}>
                  <DataTableRow className="nk-tb-col-check">
                    <div className="custom-control custom-control-sm custom-checkbox notext">
                      <input
                        type="checkbox"
                        className="custom-control-input form-control"
                        defaultChecked={item.checked}
                        id={item._id + "uid1"}
                        key={Math.random()}
                        onChange={(e) => onSelectChange(e, item._id)}
                      />
                      <label className="custom-control-label" htmlFor={item._id + "uid1"}></label>
                    </div>
                  </DataTableRow>
                  <DataTableRow>
                    <Link to={`${process.env.PUBLIC_URL}/user-details-regular/${item._id}`}>
                      <div className="user-card">
                        <UserAvatar theme={item.avatarBg} text={findUpper(item.username)} image={item.image}></UserAvatar>
                        <div className="user-info">
                          <span className="tb-lead">
                            {item.username} <span className="dot dot-success d-md-none ml-1"></span>
                          </span>
                          <span>{item.email}</span>
                        </div>
                      </div>
                    </Link>
                  </DataTableRow>
                  <DataTableRow size="lg">
                    <span>{item.email}</span>
                  </DataTableRow>
                  <DataTableRow size="lg">
                    <span>{item.address}</span>
                  </DataTableRow>
                  <DataTableRow size="lg">
                    <span>{item.phone}</span>
                  </DataTableRow>
                  <DataTableRow size="lg">
                    <span>{item.status}</span>
                  </DataTableRow>

                  <DataTableRow className="nk-tb-col-tools text-center">
                    <ul className="nk-tb-actions gx-1">
                      <li className="nk-tb-action-hidden" onClick={() => onEditClick(item._id)}>
                        <TooltipComponent
                          tag="a"
                          containerClassName="btn btn-trigger btn-icon"
                          id={"edit" + item.id}
                          icon="edit-alt-fill"
                          direction="top"
                          text="Edit"
                        />
                      </li>
                      <React.Fragment>
                        <li className="nk-tb-action-hidden" onClick={() => deleteUser(item._id)}>
                          <TooltipComponent
                            tag="a"
                            containerClassName="btn btn-trigger btn-icon"
                            id={"suspend" + item.id}
                            icon="user-cross-fill"
                            direction="top"
                            text="Delete"
                          />
                        </li>
                      </React.Fragment>
                      <li>
                        <UncontrolledDropdown>
                          <DropdownToggle tag="a" className="dropdown-toggle btn btn-icon btn-trigger">
                            <Icon name="more-h"></Icon>
                          </DropdownToggle>
                          <DropdownMenu right>
                            <ul className="link-list-opt no-bdr">
                              <li onClick={() => onEditClick(item._id)}>
                                <DropdownItem
                                  tag="a"
                                  href="#edit"
                                  onClick={(ev) => {
                                    ev.preventDefault();
                                  }}
                                >
                                  <Icon name="edit"></Icon>
                                  <span>Edit</span>
                                </DropdownItem>
                              </li>
                              <React.Fragment>
                                <li className="divider"></li>
                                <li onClick={() => deleteUser(item.id)}>
                                  <DropdownItem
                                    tag="a"
                                    href="#suspend"
                                    onClick={(ev) => {
                                      ev.preventDefault();
                                    }}
                                  >
                                    <Icon name="na"></Icon>
                                    <span>Delete</span>
                                  </DropdownItem>
                                </li>
                              </React.Fragment>
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
            {currentItems.length > 0 ? (
              <PaginationComponent
                itemPerPage={itemPerPage}
                totalItems={data.length}
                paginate={paginate}
                currentPage={currentPage}
              />
            ) : (
              <div className="text-center">
                <span className="text-silent">No data found</span>
              </div>
            )}
          </PreviewAltCard>
        </Block>

        <Modal isOpen={modal.add} toggle={() => setModal({ add: false })} className="modal-dialog-centered" size="lg">
          <ModalBody>
            <a
              href="#close"
              onClick={(ev) => {
                ev.preventDefault();
                onFormCancel();
              }}
              className="close"
            >
              <Icon name="cross-sm"></Icon>
            </a>
            <div className="p-2">
              <h5 className="title">Add User</h5>
              <div className="mt-4">
                <Form className="row gy-4" noValidate onSubmit={handleSubmit(onFormSubmit)}>
                  <Col md="6">
                    <FormGroup>
                      <label className="form-label">Name</label>
                      <input
                        className="form-control"
                        type="text"
                        name="name"
                        defaultValue={formData.name}
                        placeholder="Enter name"
                        ref={register({ required: "This field is required" })}
                      />
                      {errors.name && <span className="invalid">{errors.name.message}</span>}
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <label className="form-label">Email </label>
                      <input
                        className="form-control"
                        type="text"
                        name="email"
                        defaultValue={formData.email}
                        placeholder="Enter email"
                        ref={register({
                          required: "This field is required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "invalid email address",
                          },
                        })}
                      />
                      {errors.email && <span className="invalid">{errors.email.message}</span>}
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <label className="form-label">Address</label>
                      <input
                        className="form-control"
                        type="text"
                        name="address"
                        ref={register()}
                        defaultValue={formData.address}
                        placeholder="Enter address"
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <label className="form-label">Phone Number</label>
                      <input
                        className="form-control"
                        type="text"
                        name="phone"
                        ref={register()}
                        defaultValue={formData.phone}
                        placeholder="Enter phone number"
                      />
                    </FormGroup>
                  </Col>
                  {/* <Col md="6">
                    <FormGroup>
                      <label className="form-label">Ordered</label>
                      <input
                        className="form-control"
                        type="number"
                        name="balance"
                        defaultValue={formData.balance}
                        placeholder="Ordered"
                        ref={register({ required: "This field is required" })}
                      />
                      {errors.balance && <span className="invalid">{errors.balance.message}</span>}
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <label className="form-label">Ordered</label>
                      <input
                        className="form-control"
                        type="number"
                        name="balance"
                        defaultValue={formData.balance}
                        placeholder="Ordered"
                        ref={register({ required: "This field is required" })}
                      />
                      {errors.balance && <span className="invalid">{errors.balance.message}</span>}
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <label className="form-label">Phone</label>
                      <input
                        className="form-control"
                        type="number"
                        name="phone"
                        defaultValue={formData.phone}
                        ref={register({ required: "This field is required" })}
                      />
                      {errors.phone && <span className="invalid">{errors.phone.message}</span>}
                    </FormGroup>
                  </Col> */}
                  <Col md="12">
                    <FormGroup>
                      <label className="form-label">Status</label>
                      <div className="form-control-wrap">
                        <RSelect
                          options={filterStatus}
                          defaultValue={{ value: "unblock", label: "unblock" }}
                          onChange={(e) => setFormData({ ...formData, status: e.value })}
                        />
                      </div>
                    </FormGroup>
                  </Col>
                  <Col size="12">
                    <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                      <li>
                        <Button color="primary" size="md" type="submit">
                          Add User
                        </Button>
                      </li>
                      <li>
                        <a
                          href="#cancel"
                          onClick={(ev) => {
                            ev.preventDefault();
                            onFormCancel();
                          }}
                          className="link link-light"
                        >
                          Cancel
                        </a>
                      </li>
                    </ul>
                  </Col>
                </Form>
              </div>
            </div>
          </ModalBody>
        </Modal>

        <Modal isOpen={modal.edit} toggle={() => setModal({ edit: false })} className="modal-dialog-centered" size="lg">
          <ModalBody>
            <a
              href="#cancel"
              onClick={(ev) => {
                ev.preventDefault();
                onFormCancel();
              }}
              className="close"
            >
              <Icon name="cross-sm"></Icon>
            </a>
            <div className="p-2">
              <h5 className="title">Update User</h5>
              <div className="mt-4">
                <Form className="row gy-4" onSubmit={handleSubmit(onEditSubmit)}>
                  <Col md="6">
                    <FormGroup>
                      <label className="form-label">Name</label>
                      <input
                        className="form-control"
                        type="text"
                        name="name"
                        defaultValue={formData.name}
                        placeholder="Enter name"
                        ref={register({ required: "This field is required" })}
                      />
                      {errors.name && <span className="invalid">{errors.name.message}</span>}
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <label className="form-label">Email</label>
                      <input
                        className="form-control"
                        type="text"
                        name="email"
                        defaultValue={formData.email}
                        placeholder="Enter email"
                        ref={register({
                          required: "This field is required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "invalid email address",
                          },
                        })}
                      />
                      {errors.email && <span className="invalid">{errors.email.message}</span>}
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <label className="form-label">Address</label>
                      <input
                        className="form-control"
                        type="text"
                        name="address"
                        ref={register()}
                        defaultValue={formData.address}
                        placeholder="Enter address"
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <label className="form-label">Phone Number</label>
                      <input
                        className="form-control"
                        type="text"
                        name="phone"
                        ref={register()}
                        defaultValue={formData.phone}
                        placeholder="Enter phone number"
                      />
                    </FormGroup>
                  </Col>
                  <Col md="12">
                    <FormGroup>
                      <label className="form-label">Status</label>
                      <div className="form-control-wrap">
                        <RSelect
                          options={filterStatus}
                          defaultValue={{
                            value: formData.status,
                            label: formData.status,
                          }}
                          onChange={(e) => setFormData({ ...formData, status: e.value })}
                        />
                      </div>
                    </FormGroup>
                  </Col>
                  <Col size="12">
                    <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                      <li>
                        <Button color="primary" size="md" type="submit">
                          Update User
                        </Button>
                      </li>
                      <li>
                        <a
                          href="#cancel"
                          onClick={(ev) => {
                            ev.preventDefault();
                            onFormCancel();
                          }}
                          className="link link-light"
                        >
                          Cancel
                        </a>
                      </li>
                    </ul>
                  </Col>
                </Form>
              </div>
            </div>
          </ModalBody>
        </Modal>
      </Content>
    </React.Fragment>
  );
};
export default UserListDefaultPage;
