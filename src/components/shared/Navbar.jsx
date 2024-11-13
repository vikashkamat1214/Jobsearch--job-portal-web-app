import React from "react";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { LogOut, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/Context"; 
import { setAuthUser } from "@/redux/authSlice"; 

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setAuthUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Logout failed!");
    }
  };

  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        <div>
          <h1 className="text-3xl font-bold">
            Job <span className="text-[#F83002]">Portal</span>
          </h1>
        </div>
        <div className="flex items-center gap-14">
          <ul className="flex font-medium items-center gap-5">
            {
              user && user.role === "recruiter" ? (
                <>
                  <li className="text-2xl">
                <Link to="/admin/companies">Companies</Link>
              </li>
              <li className="text-2xl">
                <Link to="/admin/jobs">Jobs</Link>
              </li>
                </>
              ) : (
                <>
                 <li className="text-2xl">
                <Link to="/">Home</Link>
              </li>
              <li className="text-2xl">
                <Link to="/jobs">Jobs</Link>
              </li>
                <li className="text-2xl">
                  <Link to="/browse">Browse</Link>
                </li>
                </>

              )
            }
           
          </ul>
          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#6A38C2] hover:bg-[#472681]">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={user?.profile?.avatar || "https://via.placeholder.com/150"}
                    alt={user?.fullname || "User Avatar"}
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="flex gap-4 space-y-2">
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src={user?.profile?.avatar || "https://via.placeholder.com/150"}
                      alt={user?.fullname || "User Avatar"}
                    />
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{user?.fullname}</h4>
                    <p>{user?.profile?.bio || "Frontend Developer"}</p>
                  </div>
                </div>
                <div className="flex flex-col my-2 text-gray-600">

                {
                  user && user.role === 'student' && (
                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                    <User2 />
                    <Button variant="link">
                      <Link to="/profile">View Profile</Link>
                    </Button>
                  </div>
                  )
               }
                  <div className="flex w-fit items-center gap-2 cursor-pointer">
                    <LogOut />
                    <Button onClick={logoutHandler} variant="link">
                      Logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
