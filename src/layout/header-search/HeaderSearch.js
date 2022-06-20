import React from "react";
import Icon from "../../components/icon/Icon";
import { useSelector, useDispatch } from 'react-redux'
import { setValue } from './../../features/search/searchSlice'

const HeaderSearch = () => {
  const dispatch = useDispatch();

  const searchUserHandler = (value) => {
    dispatch(setValue(value));
  }

  return (
    <React.Fragment>
      <Icon name="search"></Icon>
      <input className="form-control border-transparent form-focus-none" type="text" placeholder="Search anything" onChange={e => searchUserHandler(e.target.value)} />
    </React.Fragment>
  );
};

export default HeaderSearch;
