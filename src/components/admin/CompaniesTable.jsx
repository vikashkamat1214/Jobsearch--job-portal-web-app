// import React, { useEffect, useState } from 'react';
// import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
// import { Avatar, AvatarImage } from '../ui/avatar';
// import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
// import { Edit2, MoreHorizontal } from 'lucide-react';
// import { useSelector } from 'react-redux';

// const CompaniesTable = () => {
//   const { companies, searchCompanyByText } = useSelector((store) => store.company);
//   const [filterCompany, setFilterCompany] = useState(companies);

//   useEffect(()=>{
//       const filteredCompany = companies.length >= 0 && companies.filter((company)=>{
//         if(!searchCompanyByText){
//           return  null
//         };
//         return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
//       });
//       setFilterCompany(filteredCompany);

//   },[companies, searchCompanyByText])

  

//   return (
//     <div>
//       <Table>
//         <TableCaption>A list of your recent registered companies</TableCaption>
//         <TableHeader>
//           <TableRow>
//             <TableHead>Logo</TableHead>
//             <TableHead>Name</TableHead>
//             <TableHead>Date</TableHead>
//             <TableHead className="text-right">Actions</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {companiesList.length === 0 ? (
//             <TableRow>
//               <TableCell colSpan={4} className="text-center">
//                 You haven't registered any companies yet
//               </TableCell>
//             </TableRow>
//           ) : (
//             filterCompany.map((company) => (
//               <TableRow key={company._id}>
//                 <TableCell>
//                   <Avatar>
//                     <AvatarImage
//                       src="https://www.shutterstock.com/shutterstock/photos/750240043/display_1500/stock-vector-vector-technology-circle-750240043.jpg"
//                       alt="Company Logo"
//                     />
//                   </Avatar>
//                 </TableCell>
//                 <TableCell>{company.name}</TableCell>
//                 <TableCell>{company.createdAt.split('T')[0]}</TableCell>
//                 <TableCell className="text-right cursor-pointer">
//                   <Popover>
//                     <PopoverTrigger>
//                       <MoreHorizontal />
//                     </PopoverTrigger>
//                     <PopoverContent className="w-32">
//                       <div className="flex items-center gap-2 w-fit cursor-pointer">
//                         <Edit2 className="w-4" />
//                         <span>Edit</span>
//                       </div>
//                     </PopoverContent>
//                   </Popover>
//                 </TableCell>
//               </TableRow>
//             ))
//           )}
//         </TableBody>
//       </Table>
//     </div>
//   );
// };

// export default CompaniesTable;
