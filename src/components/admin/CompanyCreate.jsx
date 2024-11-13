import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { COMPANY_API_END_POINT } from '@/utils/Context';
import { toast } from 'sonner';
import { setCompanies } from '@/redux/companySlice'; 

const CompanyCreate = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [companyName, setCompanyName] = useState('');

    const registerNewCompany = async () => {
        if (!companyName.trim()) {
            toast.error('Company name is required');
            return;
        }

        try {
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, { companyName }, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });

            if (res?.data?.success) {
                
                dispatch(setCompanies([res.data.company])); 
                toast.success(res.data.message);
                const companyId = res.data.company._id;
                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            console.error('Error registering company:', error);
            toast.error('Failed to register company');
        }
    };

    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto my-10 p-5'>
                <div className='mb-6'>
                    <h1 className='font-bold text-2xl'>Your Company</h1>
                    <p className='text-gray-500'>
                        What would you like to name your company? You can change this later.
                    </p>
                </div>

                <Label htmlFor="companyName">Company Name</Label>
                <Input
                    id="companyName"
                    type='text'
                    className='my-2'
                    placeholder='JobHunt, Microsoft, etc.'
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                />
                <div className='flex items-center gap-2 my-10'>
                    <Button variant='outline' onClick={() => navigate("/admin/companies")}>Cancel</Button>
                    <Button onClick={registerNewCompany}>Continue</Button>
                </div>
            </div>
        </div>
    );
};

export default CompanyCreate;
