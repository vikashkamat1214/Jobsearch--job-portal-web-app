import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";

const Profile = () => {
  const [open, setOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage
                src={user?.profile?.avatar || "https://via.placeholder.com/150"} // Provide a default image or user avatar
                alt="profile"
              />
            </Avatar>
            <div>
              <h1 className="font-medium text-xl">{user?.fullname}</h1>
              <p>{user?.profile?.bio || "No bio available"}</p>
            </div>
          </div>
          <Button onClick={() => setOpen(true)} className="text-right" variant="outline">
            <Pen />
          </Button>
        </div>
        <div className="my-5">
          <div className="flex items-center gap-3 my-2">
            <Mail />
            <span>{user?.email || "No email provided"}</span>
          </div>
          <div className="flex items-center gap-3 my-2">
            <Contact />
            <span>{user?.phone || "No phone number provided"}</span>
          </div>
        </div>
        <div>
          <h1>Skills</h1>
          <div className="flex items-center gap-1">
            {user?.profile?.skills && user?.profile?.skills.length > 0 ? (
              user?.profile?.skills.map((item, index) => <Badge key={index}>{item}</Badge>)
            ) : (
              <span>NA</span>
            )}
          </div>
        </div>
        <div className="grid w-full max-w-sm items-center gap-1">
          <Label className="text-md font-bold">Resume</Label>
          {user?.profile?.resume ? (
            <a target="_blank" rel="noopener noreferrer" href={user.profile.resume}>
              View Resume
            </a>
          ) : (
            <span>NA</span>
          )}
        </div>
      </div>
      <div className="max-w-4xl mx-auto bg-white rounded-2xl my-5 p-8">
        <h1 className="font-bold text-lg my-5">Applied Jobs</h1>
        <AppliedJobTable />
      </div>
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
