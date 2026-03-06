import ProfileNav from "./ProfileNav";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Save,
  Loader2,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { Badge } from "@/ui/badge";
import { toast } from "sonner";
import { useContext } from "react";
import { AuthContext } from "../../store/AuthContext";
import { useState } from "react";
import useApi from "../../hooks/useApi";
function Profile() {
  const { user } = useContext(AuthContext);
  const detailObj = {
    name: user.name,
    phone: user.phone || "",
    address: user.address || "",
  };
  const [details, setDetails] = useState(detailObj);
  const roles = ["user", user.role];
  const {request} =useApi();
 async  function handle() {
     try {
      if(details.name){
       const result = await request('/api/auth/update','PATCH',details);
      if (result) {
        toast.success(result.message);
      } 
    }
    } catch (err) {
      const res =err.response;
      const data = res.data;
      toast.error(data.message);
    }
  }
  return (
    <div className="flex flex-col items-center">
      <ProfileNav />
      <div className="mb-10 py-8 px-4 bg-white w-[60%] h-[500px] rounded rounded-2xl border border-muted-foreground-20">
        <div className="p-5">
          <div className="mb-6 flex items-center gap-4 pb-8">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <User className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                {user.name || "User"}
              </h2>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
              <div className="mt-1 flex gap-1">
                {roles.map((role) => (
                  <Badge key={role}>
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 pb-8">
            <div className="space-y-2">
              <Label htmlFor="profileName">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="profileName"
                  value={details.name}
                  onChange={(e) => {
                    setDetails({
                      ...details,
                      name: e.target.value,
                    });
                  }}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              {user.isVerified ? (
                <Label htmlFor="profileEmail">Email</Label>
              ) : (
                <Label htmlFor="profileEmail">
                  Email{" "}
                  <small className="text-primary text-['20px']">
                    not verified
                  </small>
                </Label>
              )}
              <div className="relative flex">
                {user.isVerified ? (
                  <>
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="profileEmail"
                      value={user.email}
                      disabled
                      className="pl-10"
                    />
                  </>
                ) : (
                  <>
                    {" "}
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="profileEmail"
                      value={user.email}
                      disabled
                      className="pl-10"
                    />{" "}
                    <Button className="ml-4">Resend </Button>
                  </>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="profilePhone">Phone</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="profilePhone"
                  value={details.phone}
                  onChange={(e) => 
                    {setDetails({
                      ...details,
                      phone: e.target.value,
                    });}
                  }
                  className="pl-10"
                  placeholder="Enter phone number"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="profileAddress">Address</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="profileAddress"
                  value={details.address}
                  onChange={(e) => {
                   setDetails({
                      ...details,
                      address: e.target.value,
                    });
                  }}
                  className="pl-10"
                  placeholder="Enter address"
                />
              </div>
            </div>
          </div>

          <Button onClick={handle}>Save Changes</Button>
        </div>
      </div>
    </div>
  );
}
export default Profile;
