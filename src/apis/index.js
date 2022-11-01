import axios from "axios";
import { get } from "lodash";

const SCAI_API = process.env.REACT_APP_SCAI_API_ENDPOINT;
const SNOP_API = process.env.REACT_APP_SNOP_API_ENDPOINT;
const SCAI_API_PERSONNEL = process.env.REACT_APP_SCAI_API_ENDPOINT_PERSONNEL;

const user = JSON.parse(localStorage.getItem('user'))
const tenantId = get(user, 'tenant_id', '')
const buId = get(user, 'business_unit_id', '')

const config = {
  headers: { 'Content-Type': 'application/json' },
}

const HeaderID = {
  headers: tenantId,
}

//Product Api's
export const getAllProductsAPI = async (body) => {
  const {
    pageIndex,
    pageSize,
    sortFieldStringWithASCOrDESC,
    searchValue,
  } = body;

  return axios.get(
    `${SCAI_API}?pageIndex=${pageIndex}&pageSize=${pageSize}&sortFieldStringWithASCOrDESC=${sortFieldStringWithASCOrDESC}&searchValue=${searchValue}&tenant_id=${tenantId}&bu_id=${buId}`,
    config,
  )
}

export const uploadCSVDataAPI = async (body) => {
  const { csvFile } = body;

  const uploadData = new FormData()

  uploadData.append('csvFile', csvFile)
  uploadData.append('tenant_id', tenantId)
  uploadData.append('bu_id', buId)

  const uploadConfig = {
    headers: { 'Content-Type': 'multipart/form-data' },
  }

  return await axios.post(`${SCAI_API}`, uploadData, uploadConfig)
}



//Personnel Api's
export const getAllPersonnelAPI = async (body) => {
  const {
    pageIndex,
    pageSize,
    sortFieldStringWithASCOrDESC,
    searchValue,
    tenantId,
  } = body;

  return axios.get(
    `${SCAI_API_PERSONNEL}?pageIndex=${pageIndex}&pageSize=${pageSize}&sortFieldStringWithASCOrDESC=${sortFieldStringWithASCOrDESC}&searchValue=${searchValue}&tenant_id=${tenantId}&bu_id=${buId}`,
    config
  );
};

export const uploadCSVDataPersonnelAPI = async (body) => {
  const { csvFile, tenantId } = body;
  const uploadData = new FormData();

  uploadData.append("csvFile", csvFile);
  uploadData.append("tenant_id", tenantId);
  uploadData.append('bu_id', buId)

  const uploadConfig = {
    headers: { "Content-Type": "multipart/form-data" },
  };

  return await axios.post(`${SCAI_API_PERSONNEL}`, uploadData, uploadConfig);
};



//SNOP Api's
export const getAllSnopAPI = async () => {
  return axios.get(`${SNOP_API}/snop?tenant_id=${tenantId}&bu_id=${buId}`, config);
};

export const createSnopAPI = async (body) => {
  return axios.post(`${SNOP_API}/snop?tenant_id=${tenantId}&bu_id=${buId}`, body, HeaderID)
}

export const editSnopAPI = async (body) => {
  return axios.put(`${SNOP_API}/snop?tenant_id=${tenantId}&bu_id=${buId}`, body, config)
}

export const deleteSnopAPI = async (snop_id) => {
  return axios.delete(`${SNOP_API}/snop?snop_id=${snop_id}&tenant_id=${tenantId}&bu_id=${buId}`)
}
