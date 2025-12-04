import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { Camera, Mail, Phone, Save, X } from "lucide-react";
import Footer from "./Footer";
import Navigation from "./Navigation";
import { useDispatch, useSelector } from "react-redux";
import { saveProfile, updateUser } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const BIO_CHAR_LIMIT = 170;
  const BIO_WORD_LIMIT = 33;

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [profileData, setProfileData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone || "",
    bio: user.bio || "",
  });

  const BASE_URL = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();

  const [avatarFile, setAvatarFile] = useState(null);

  const [avatarPreview, setAvatarPreview] = useState(user.avatar || null);

  const handleInputChange = (field, value) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAvatarFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("name", profileData.name);
      formData.append("email", profileData.email);
      formData.append("phone", profileData.phone);
      formData.append("bio", profileData.bio);

      if (avatarFile) {
        formData.append("avatar", avatarFile);
      }

      const response = await dispatch(
        saveProfile({ formData, userId: user._id })
      );

      if (response.payload?.user) {
        dispatch(updateUser(response.payload.user));
      }

      toast.success("Profile updated successfully!");
      navigate("/profile");
    } catch (error) {
      toast.error("Failed to update profile!");
    }
  };

  const handleBioChange = (value) => {
    const words = value.trim().split(/\s+/);

    // Limit words
    if (words.length > BIO_WORD_LIMIT) return;

    // Limit characters
    if (value.length > BIO_CHAR_LIMIT) return;

    setProfileData((prev) => ({ ...prev, bio: value }));
  };

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8 mt-15">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h1 className="text-4xl font-bold mb-2">Edit Profile</h1>
            <p className="text-gray-600">Update your personal information</p>
          </div>

          <Card className="shadow-lg border-0 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
            <CardHeader className="border-b border-gray-300 bg-gradient-to-r from-white to-gray-100">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="relative">
                  <Avatar className="h-24 w-24 border-4 border-white shadow-xl">
                    <AvatarImage
                      src={
                        avatarPreview?.startsWith("data:")
                          ? avatarPreview
                          : avatarPreview
                          ? `${BASE_URL}${avatarPreview}`
                          : undefined
                      }
                      alt={profileData.name}
                    />
                    <AvatarFallback className="text-2xl font-semibold bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                      {profileData.name
                        ?.split(" ")
                        ?.map((n) => n[0])
                        ?.join("")
                        ?.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>

                  {/* Camera Button */}
                  <label
                    htmlFor="avatar-upload"
                    className="absolute bottom-0 right-0 bg-black/70 hover:bg-black text-white w-8 h-8 rounded-full flex items-center justify-center cursor-pointer shadow-lg transition-all"
                  >
                    <Camera className="h-4 w-4" />
                    <input
                      id="avatar-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleAvatarChange}
                    />
                  </label>
                </div>

                <div className="text-center sm:text-left">
                  <CardTitle className="text-3xl !font-bold">
                    {profileData.name}
                  </CardTitle>
                  <CardDescription className="text-[16px] font-medium mt-1 text-gray-500">
                    {profileData.email}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-6 space-y-6">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    className="border-gray-400"
                    id="name"
                    value={profileData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email Address
                  </Label>
                  <Input
                    className="border-gray-400"
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Phone Number
                  </Label>
                  <Input
                    className="border-gray-400"
                    id="phone"
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>

                  <Textarea
                    id="bio"
                    value={profileData.bio}
                    onChange={(e) => handleBioChange(e.target.value)}
                    rows={4}
                    className="border-gray-400"
                  />

                  {/* Counter */}
                  <p className="text-sm text-gray-500 flex justify-between">
                    <span>
                      {
                        profileData.bio.trim().split(/\s+/).filter(Boolean)
                          .length
                      }{" "}
                      / 28 words
                    </span>
                    <span>{profileData.bio.length} / 150 characters</span>
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button
                  onClick={handleSave}
                  className="flex-1 bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 !text-black !font-semibold !shadow-md hover:brightness-110 transition-all"
                >
                  <Save className="mr-2 h-5 w-5" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EditProfile;
