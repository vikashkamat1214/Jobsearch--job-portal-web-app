import { createSlice } from '@reduxjs/toolkit';

const companySlice = createSlice({
  name: 'company',
  initialState: {
    companies: [], 
    searchCompanyByText:"",
  },
  reducers: {
    setSingleCompany: (state, action) => {
      state.SingleCompany = action.payload;
    },
    setCompanies: (state, action) => {
      state.companies = action.payload;
    },
    setSearchCompanyByText: (state, action) => {
      state.searchCompanyByText = action.payload;
    },
  },
});

export const { setCompanies,SingleCompany, searchCompanyByText} = companySlice.actions;
export default companySlice.reducer;
