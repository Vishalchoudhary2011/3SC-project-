import axios from "axios";
import { get } from "lodash";

const SCAI_API = process.env.REACT_APP_SCAI_API_ENDPOINT;
const SNOP_API = process.env.REACT_APP_SNOP_API_ENDPOINT;
const SCAI_API_PERSONNEL = process.env.REACT_APP_SCAI_API_ENDPOINT_PERSONNEL;

const user = JSON.parse(localStorage.getItem("user"));
const tenantId = get(user, "tenant_id", "1e8b88e2-10e4-43b1-a0f8-96cbafe1ccd3");

const config = {
  headers: { "Content-Type": "application/json", 
              // "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3MiOiJhY2Nlc3MiLCJleHAiOjE2NjU0ODIzODgsImlhdCI6MTY2NTM5NTk4OCwianRpIjoiMTQwZTU5YzNhNDNhNGFjMGE3MDIyOWNmNzhjZWMyMzAiLCJ1c2VyX2lkIjoiNTM0ZWI3OTUtY2Q3OC00MTViLTk1MTQtZDM0ZmRkNGYyNmFlIiwicm9sZXMiOlsiU0FMRVNfUExBTk5FUiJdLCJwZXJtaXNzaW9ucyI6WyJQUk9EVUNUX1ZJRVciXSwidGVuYW50X2lkIjoiMWU4Yjg4ZTItMTBlNC00M2IxLWEwZjgtOTZjYmFmZTFjY2QzIiwidGVuYW50X25hbWUiOiJvcmcxIiwiZW1haWwiOiJrZXdhbDA3QGdtYWlsLmNvbSIsImJ1c2luZXNzX3VuaXRfaWQiOiJlODRjNTU4NS0xOWI4LTQyOTUtYTg3My00NzdlZDhkOTA1ZjQiLCJidXNpbmVzc191bml0X25hbWUiOiJqcG5hZ2FyLWJ1LTIyMTMifQ.3oqlgIttu81uwZPPRjMHYokHyqShNd0aW9aeqoJzSvQ"
},
};

//Product API's
export const getProductHierrachy = async () => {
  const body = {
    ProductHierarchyNoOfLevels: 5,
    ProductHierarchyLevel1: "Cat",
    ProductHierarchyLevel2: "Sub Cat",
    ProductHierarchyLevel3: "Brand",
    ProductHierarchyLevel4: "Product",
    ProductHierarchyLevel5: "Sub Product",
  };
  try {
    await axios.post(`${SCAI_API}/setProductHierarchyResponse`, body, config);
  } catch (error) {
    console.log(error);
  }
};

export const getPersonnelHierrachy = async () => {
  const body = {
    salesmanHierarchyRequest: {
      SalesmanHierarchyNoOfLevels: 4,
      SalesmanHierarchyLevel1: "s1",
      SalesmanHierarchyLevel2: "s2",
      SalesmanHierarchyLevel3: "s3",
      SalesmanHierarchyLevel4: "s4",
    },
    demandPlannerHierarchyRequest: {
      DemandPlannerHierarchyNoOfLevels: 4,
      DemandPlannerHierarchyLevel1: "d1",
      DemandPlannerHierarchyLevel2: "d2",
      DemandPlannerHierarchyLevel3: "d3",
      DemandPlannerHierarchyLevel4: "d4",
    },
  };
  try {
    await axios.post(
      `${SCAI_API_PERSONNEL}/setSalesPlannerHierarchyResponse`,
      body,
      config
    );
  } catch (error) {
    console.log(error);
  }
};

export const getAllProductsAPI = async (body) => {
  const {
    pageIndex,
    pageSize,
    sortFieldStringWithASCOrDESC,
    searchValue,
    // productId,
    // tenantId,
  } = body;

  return axios.get(
    `${SCAI_API}?pageIndex=${pageIndex}&pageSize=${pageSize}&sortFieldStringWithASCOrDESC=${sortFieldStringWithASCOrDESC}&searchValue=${searchValue}&tenantId=${tenantId}`,
    config
  );
};

export const getAllPersonnelAPI = async (body) => {
  const {
    pageIndex,
    pageSize,
    sortFieldStringWithASCOrDESC,
    searchValue,
    tenantId,
  } = body;

  return axios.get(
    `${SCAI_API_PERSONNEL}?pageIndex=${pageIndex}&pageSize=${pageSize}&sortFieldStringWithASCOrDESC=${sortFieldStringWithASCOrDESC}&searchValue=${searchValue}&tenantId=${tenantId}`,
    config
  );
};

export const uploadCSVDataAPI = async (body) => {
  const { csvFile } = body;

  const uploadData = new FormData();

  uploadData.append("csvFile", csvFile);
  uploadData.append("tenantId", tenantId);

  const uploadConfig = {
    headers: { "Content-Type": "multipart/form-data" },
  };

  return await axios.post(`${SCAI_API}`, uploadData, uploadConfig);
};

//SNOP Api's
export const getAllSnopAPI = async () => {
  return axios.get(`${SNOP_API}/snop?tenant_id=${tenantId}&buid=e84c5585-19b8-4295-a873-477ed8d905f4`, config);
};

export const uploadCSVDataPersonnelAPI = async (body) => {
  const { csvFile, tenantId } = body;
  const uploadData = new FormData();

  uploadData.append("csvFile", csvFile);
  uploadData.append("tenantId", tenantId);

  const uploadConfig = {
    headers: { "Content-Type": "multipart/form-data" },
  };

  return await axios.post(`${SCAI_API_PERSONNEL}`, uploadData, uploadConfig);
};
